import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request) {
  try {
    // Authenticate request
    const apiKey = process.env.CONTENT_API_KEY;
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      type, // 'blog' or 'work'
      slug,
      title,
      description,
      date,
      author,
      content,
      images // Array of { filename, base64Data }
    } = await request.json();
    
    // Validate input
    if (!type || !slug || !title || !content || !date || !author) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Validate type
    if (type !== 'blog' && type !== 'work') {
      return NextResponse.json({ error: 'Type must be either "blog" or "work"' }, { status: 400 });
    }
    
    // Create directory structure
    const dirPath = path.join(process.cwd(), 'src', 'app', type, slug);
    await fs.mkdir(dirPath, { recursive: true });
    
    // Create XMD file with metadata
    let xmdContent;
    
    if (type === 'blog') {
      xmdContent = `import imageAuthor from '@/images/team/${author.image}'

export const article = {
  date: '${date}',
  title: '${title}',
  description: '${description}',
  author: {
    name: '${author.name}',
    role: '${author.role}',
    image: { src: imageAuthor },
  },
}

export const metadata = {
  title: article.title,
  description: article.description,
}

${content}`;
    } else {
      // For work case studies
      xmdContent = `import imageAuthor from '@/images/team/${author.image}'

export const caseStudy = {
  date: '${date}',
  title: '${title}',
  description: '${description}',
  author: {
    name: '${author.name}',
    role: '${author.role}',
    image: { src: imageAuthor },
  },
}

export const metadata = {
  title: caseStudy.title,
  description: caseStudy.description,
}

${content}`;
    }
    
    await fs.writeFile(path.join(dirPath, 'page.mdx'), xmdContent);
    
    // Save images
    if (images && images.length > 0) {
      for (const image of images) {
        if (!image.filename || !image.base64Data) {
          continue;
        }
        
        // Extract the base64 data (remove data URL prefix if present)
        let base64Data = image.base64Data;
        if (base64Data.includes(',')) {
          base64Data = base64Data.split(',')[1];
        }
        
        const imageBuffer = Buffer.from(base64Data, 'base64');
        await fs.writeFile(path.join(dirPath, image.filename), imageBuffer);
      }
    }
    
    // Git operations
    if (process.env.ENABLE_GIT_OPERATIONS === 'true') {
      // Set git user config if provided
      if (process.env.GIT_USER_NAME && process.env.GIT_USER_EMAIL) {
        await execAsync(`git config user.name "${process.env.GIT_USER_NAME}"`);
        await execAsync(`git config user.email "${process.env.GIT_USER_EMAIL}"`);
      }
      
      await execAsync(`cd ${process.cwd()} && git add .`);
      await execAsync(`cd ${process.cwd()} && git commit -m "Add new ${type} post: ${title}"`);
      
      // Use token for authentication if provided
      if (process.env.GIT_ACCESS_TOKEN) {
        try {
          // Get the current remote URL
          const { stdout: remoteUrl } = await execAsync('git config --get remote.origin.url');
          
          // Construct token-based URL (handles both HTTPS and SSH formats)
          let tokenUrl;
          if (remoteUrl.trim().startsWith('https://')) {
            // For HTTPS URLs: https://TOKEN@github.com/user/repo.git
            tokenUrl = remoteUrl.trim().replace('https://', `https://${process.env.GIT_ACCESS_TOKEN}@`);
          } else {
            // For SSH URLs, convert to HTTPS with token
            const sshMatch = remoteUrl.trim().match(/git@([^:]+):([^\/]+)\/(.+)\.git/);
            if (sshMatch) {
              const [_, host, user, repo] = sshMatch;
              tokenUrl = `https://${process.env.GIT_ACCESS_TOKEN}@${host}/${user}/${repo}.git`;
            } else {
              tokenUrl = remoteUrl.trim(); // Fallback to original if format not recognized
            }
          }
          
          await execAsync(`cd ${process.cwd()} && git push ${tokenUrl}`);
        } catch (gitError) {
          console.error('Error during git operations with token:', gitError);
          // Fallback to standard push if token approach fails
          await execAsync(`cd ${process.cwd()} && git push`);
        }
      } else {
        // Standard push if no token provided
        await execAsync(`cd ${process.cwd()} && git push`);
      }
    }
    
    // Revalidate the path to make the new content visible immediately
    const contentPath = `/${type}/${slug}`;
    try {
      // Call the revalidate API
      const revalidateResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ path: contentPath })
      });
      
      if (!revalidateResponse.ok) {
        console.error('Failed to revalidate path:', await revalidateResponse.text());
      }
    } catch (revalidateError) {
      console.error('Error revalidating path:', revalidateError);
      // Continue despite revalidation error
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `${type} post created successfully`,
      path: contentPath
    });
  } catch (error) {
    console.error('Error creating content:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
