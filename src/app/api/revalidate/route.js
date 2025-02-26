import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    // Authenticate request
    const apiKey = process.env.CONTENT_API_KEY;
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== apiKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { path } = await request.json();
    
    // Validate input
    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }
    
    // Revalidate the path
    revalidatePath(path);
    
    // Also revalidate the main blog or work page if a specific post is revalidated
    if (path.startsWith('/blog/') && path !== '/blog') {
      revalidatePath('/blog');
    } else if (path.startsWith('/work/') && path !== '/work') {
      revalidatePath('/work');
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Revalidated path: ${path}`
    });
  } catch (error) {
    console.error('Error revalidating path:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
