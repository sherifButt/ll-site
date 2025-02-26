/**
 * Helper functions for revalidating paths in the application
 */

/**
 * Revalidates a specific path by calling the revalidate API
 * 
 * @param {string} path - The path to revalidate
 * @param {string} apiKey - The API key for authentication
 * @returns {Promise<boolean>} - True if revalidation was successful, false otherwise
 */
export async function revalidatePath(path, apiKey) {
  if (!path || !apiKey) {
    console.error('Path and API key are required for revalidation');
    return false;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const response = await fetch(`${baseUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({ path })
    });

    if (!response.ok) {
      console.error('Failed to revalidate path:', await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error revalidating path:', error);
    return false;
  }
}

/**
 * Revalidates a blog post and the blog index page
 * 
 * @param {string} slug - The slug of the blog post
 * @param {string} apiKey - The API key for authentication
 * @returns {Promise<boolean>} - True if revalidation was successful, false otherwise
 */
export async function revalidateBlogPost(slug, apiKey) {
  const postPath = `/blog/${slug}`;
  const blogIndexPath = '/blog';
  
  const postRevalidated = await revalidatePath(postPath, apiKey);
  const indexRevalidated = await revalidatePath(blogIndexPath, apiKey);
  
  return postRevalidated && indexRevalidated;
}

/**
 * Revalidates a work case study and the work index page
 * 
 * @param {string} slug - The slug of the work case study
 * @param {string} apiKey - The API key for authentication
 * @returns {Promise<boolean>} - True if revalidation was successful, false otherwise
 */
export async function revalidateWorkPost(slug, apiKey) {
  const postPath = `/work/${slug}`;
  const workIndexPath = '/work';
  
  const postRevalidated = await revalidatePath(postPath, apiKey);
  const indexRevalidated = await revalidatePath(workIndexPath, apiKey);
  
  return postRevalidated && indexRevalidated;
}
