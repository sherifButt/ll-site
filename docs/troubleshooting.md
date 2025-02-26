# Troubleshooting Guide for Dynamic Content

This guide helps you diagnose and resolve common issues that may arise when using the dynamic content API and n8n workflows.

## API Endpoint Issues

### Authentication Errors

**Symptoms:**
- 401 Unauthorized response
- Error message: "Unauthorized"

**Possible Causes:**
1. Missing or incorrect API key
2. Incorrect Authorization header format

**Solutions:**
1. Verify that `CONTENT_API_KEY` is set in your environment variables
2. Ensure the Authorization header is formatted as `Bearer your-api-key`
3. Check for whitespace or special characters in the API key
4. Regenerate the API key if necessary

### Missing Required Fields

**Symptoms:**
- 400 Bad Request response
- Error message: "Missing required fields"

**Possible Causes:**
1. One or more required fields are missing in the request body
2. Fields have incorrect data types

**Solutions:**
1. Ensure all required fields are included in the request:
   - `type` (must be "blog" or "work")
   - `slug`
   - `title`
   - `content`
   - `date`
   - `author` (with `name`, `role`, and `image`)
2. Check that all fields have the correct data types

### File System Errors

**Symptoms:**
- 500 Internal Server Error response
- Error message related to file system operations

**Possible Causes:**
1. Insufficient permissions to create directories or files
2. Disk space issues
3. Path issues

**Solutions:**
1. Check file system permissions for the application directory
2. Verify available disk space
3. Ensure the application has write access to the content directories

## Git Operation Issues

### Git Command Failures

**Symptoms:**
- 500 Internal Server Error response
- Error message containing git command output

**Possible Causes:**
1. Git not installed on the server
2. Git user configuration not set
3. Authentication issues with the git repository
4. Merge conflicts

**Solutions:**
1. Verify git is installed on the server
2. Set `GIT_USER_NAME` and `GIT_USER_EMAIL` environment variables
3. Configure git authentication (SSH keys or credentials)
4. Check for merge conflicts and resolve them manually

### Push Failures

**Symptoms:**
- Error message: "git push failed"
- Content created but not pushed to repository

**Possible Causes:**
1. Remote repository not accessible
2. Authentication issues
3. Branch protection rules

**Solutions:**
1. Verify network connectivity to the git repository
2. Check git credentials and permissions
3. Ensure the server has permission to push to the branch
4. Consider using a dedicated branch for automated content

## Revalidation Issues

### Revalidation Failures

**Symptoms:**
- Content created but not visible on the site
- Error in logs about revalidation

**Possible Causes:**
1. Incorrect `NEXT_PUBLIC_BASE_URL` environment variable
2. Next.js cache issues
3. Network issues when calling the revalidation endpoint

**Solutions:**
1. Verify `NEXT_PUBLIC_BASE_URL` is set correctly
2. Check that the revalidation endpoint is accessible
3. Manually trigger revalidation for the affected path
4. Restart the Next.js server if necessary

### Cache Issues

**Symptoms:**
- Old content still visible after adding new content
- Inconsistent content visibility

**Possible Causes:**
1. Browser cache
2. CDN cache
3. Next.js cache not invalidated properly

**Solutions:**
1. Clear browser cache
2. Purge CDN cache if applicable
3. Add cache control headers to prevent caching of dynamic pages
4. Implement a cache-busting mechanism (e.g., query parameters)

## n8n Workflow Issues

### Webhook Trigger Issues

**Symptoms:**
- Workflow not triggered when expected
- No execution logs in n8n

**Possible Causes:**
1. Incorrect webhook URL
2. Network issues
3. Webhook not active

**Solutions:**
1. Verify the webhook URL is correct
2. Check that the webhook is accessible from the source
3. Ensure the workflow is active in n8n
4. Test the webhook using a tool like Postman

### Data Transformation Issues

**Symptoms:**
- Workflow executes but produces incorrect data
- Error in function nodes

**Possible Causes:**
1. JavaScript errors in function nodes
2. Incorrect data structure
3. Missing or null values

**Solutions:**
1. Add debug nodes to inspect data at each step
2. Check for JavaScript errors in function nodes
3. Verify input data structure matches expectations
4. Add error handling for missing or null values

### Image Processing Issues

**Symptoms:**
- Images not appearing in content
- Broken image links
- Error messages about base64 data

**Possible Causes:**
1. Incorrect base64 encoding
2. Image file size too large
3. Incorrect image references in markdown content

**Solutions:**
1. Verify base64 data is correctly formatted
2. Optimize images to reduce file size
3. Check image references in markdown content
4. Ensure image filenames match references

## Content Formatting Issues

### Markdown Rendering Issues

**Symptoms:**
- Content not rendering as expected
- Missing or incorrect formatting

**Possible Causes:**
1. Incorrect markdown syntax
2. Special characters not escaped
3. MDX compatibility issues

**Solutions:**
1. Validate markdown syntax
2. Escape special characters in content
3. Test content with a markdown previewer
4. Check MDX compatibility for advanced features

### Image Display Issues

**Symptoms:**
- Images not displaying in content
- Broken image links

**Possible Causes:**
1. Incorrect image paths
2. Missing images
3. Image format not supported

**Solutions:**
1. Verify image paths are relative to the content file
2. Check that images are correctly uploaded
3. Use supported image formats (JPEG, PNG, GIF, WebP)
4. Optimize images for web display

## Environment Variable Issues

### Missing Environment Variables

**Symptoms:**
- Unexpected behavior in API endpoints
- Error messages about undefined variables

**Possible Causes:**
1. Environment variables not set
2. Environment variables not accessible to the application

**Solutions:**
1. Verify all required environment variables are set:
   - `CONTENT_API_KEY`
   - `NEXT_PUBLIC_BASE_URL`
   - `ENABLE_GIT_OPERATIONS` (if using git)
   - `GIT_USER_NAME` and `GIT_USER_EMAIL` (if using git)
2. Check that environment variables are accessible to the application
3. Restart the application after changing environment variables

### Environment Variable Format Issues

**Symptoms:**
- Unexpected behavior despite environment variables being set

**Possible Causes:**
1. Incorrect format for environment variables
2. Whitespace or special characters in values

**Solutions:**
1. Check environment variable formats:
   - `CONTENT_API_KEY` should be a string without spaces
   - `NEXT_PUBLIC_BASE_URL` should include protocol (e.g., `https://example.com`)
   - `ENABLE_GIT_OPERATIONS` should be "true" or "false"
2. Remove any leading or trailing whitespace
3. Escape special characters if necessary

## Deployment Issues

### Build Failures

**Symptoms:**
- Build fails after adding new content
- Error messages in build logs

**Possible Causes:**
1. Invalid content format
2. Missing dependencies
3. Build script issues

**Solutions:**
1. Check build logs for specific error messages
2. Verify content format is valid
3. Ensure all dependencies are installed
4. Test build locally before deploying

### Runtime Errors

**Symptoms:**
- Application crashes after deployment
- Error messages in server logs

**Possible Causes:**
1. Incompatible content format
2. Server configuration issues
3. Environment variable issues

**Solutions:**
1. Check server logs for specific error messages
2. Verify content format is compatible with the application
3. Check server configuration
4. Verify environment variables are set correctly in production

## Advanced Troubleshooting

### Debugging API Endpoints

To debug API endpoints:

1. Add console.log statements to the API endpoint code
2. Check server logs for output
3. Use a tool like Postman to test API endpoints directly
4. Add detailed error handling to API endpoints

Example of enhanced error handling:

```javascript
try {
  // API endpoint code
} catch (error) {
  console.error('Detailed error:', {
    message: error.message,
    stack: error.stack,
    request: {
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      body: await request.text()
    }
  });
  return NextResponse.json({ error: error.message }, { status: 500 });
}
```

### Debugging n8n Workflows

To debug n8n workflows:

1. Add "Debug" nodes between steps to inspect data
2. Enable "Run Once" mode to test specific parts of the workflow
3. Check execution logs for detailed error messages
4. Use the "Function" node to add custom error handling

Example of a debug function node:

```javascript
// Log all input data for debugging
console.log('Input data:', JSON.stringify($input.item.json, null, 2));

// Continue with the original data
return $input.item;
```

## Getting Help

If you're still experiencing issues after trying the solutions in this guide:

1. Check the Next.js documentation for specific errors
2. Search the n8n community forums for similar issues
3. Review the git documentation for git-related problems
4. Contact your development team with detailed information about the issue:
   - Exact error messages
   - Steps to reproduce
   - Environment details (OS, Node.js version, etc.)
   - Relevant logs
