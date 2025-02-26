# Dynamic Content Guide

This guide explains how to dynamically add new blog posts and work case studies to your NextJS site using the content API and n8n workflows.

## Overview

The site has been configured to allow dynamic content addition through an API endpoint. This enables you to:

- Create new blog posts or work case studies programmatically
- Upload associated images
- Automatically revalidate the site to make the new content visible immediately
- Optionally commit changes to the git repository

## API Endpoints

The following API endpoints are available:

### 1. Content Creation API

- **Endpoint**: `/api/content`
- **Method**: POST
- **Authentication**: Bearer token (set in environment variables)

This endpoint creates new blog posts or work case studies with their associated images.

#### Request Format

```json
{
  "type": "blog", // or "work"
  "slug": "my-new-post",
  "title": "My New Blog Post",
  "description": "This is a description of my new blog post",
  "date": "2025-02-26",
  "author": {
    "name": "Author Name",
    "role": "Author Role",
    "image": "author-name.jpg" // Reference to an image in src/images/team/
  },
  "content": "## Heading\n\nContent goes here...\n\n![](./image1.jpg)\n\nMore content...",
  "images": [
    {
      "filename": "image1.jpg",
      "base64Data": "base64-encoded-image-data" // Can include data URL prefix
    }
  ]
}
```

#### Response Format

```json
{
  "success": true,
  "message": "blog post created successfully",
  "path": "/blog/my-new-post"
}
```

### 2. Revalidation API

- **Endpoint**: `/api/revalidate`
- **Method**: POST
- **Authentication**: Bearer token (same as content API)

This endpoint revalidates specific paths to make new content visible immediately.

#### Request Format

```json
{
  "path": "/blog/my-new-post"
}
```

#### Response Format

```json
{
  "success": true,
  "message": "Revalidated path: /blog/my-new-post"
}
```

## Testing with cURL and Postman

### Complete cURL Examples

#### Creating a Blog Post

```bash
curl -X POST https://your-site.com/api/content \
  -H "Authorization: Bearer your-secure-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "blog",
    "slug": "my-test-post",
    "title": "Testing the Content API",
    "description": "This is a post created using cURL to test the content API",
    "date": "2025-02-26",
    "author": {
      "name": "John Doe",
      "role": "Developer",
      "image": "john-doe.jpg"
    },
    "content": "## Hello World\n\nThis is a test post created via the API.\n\n- Point 1\n- Point 2\n- Point 3",
    "images": []
  }'
```

#### Creating a Blog Post with an Image

```bash
# First, encode your image to base64
# Linux/Mac:
IMAGE_BASE64=$(base64 -i /path/to/image.jpg)
# Windows (PowerShell):
# $IMAGE_BASE64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\path\to\image.jpg"))

curl -X POST https://your-site.com/api/content \
  -H "Authorization: Bearer your-secure-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "blog",
    "slug": "my-image-post",
    "title": "Testing with Images",
    "description": "This post includes an image uploaded through the API",
    "date": "2025-02-26",
    "author": {
      "name": "John Doe",
      "role": "Developer",
      "image": "john-doe.jpg"
    },
    "content": "## Image Test\n\nThis post has an image attachment.\n\n![Featured Image](./featured-image.jpg)",
    "images": [
      {
        "filename": "featured-image.jpg",
        "base64Data": "'$IMAGE_BASE64'"
      }
    ]
  }'
```

#### Creating a Blog Post with Multiple Images (Complete Example)

For a more complete example with multiple images and proper base64 encoding:

```bash
curl -X POST https://your-site.com/api/content \
  -H "Authorization: Bearer your-secure-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "blog",
    "slug": "multi-image-post",
    "title": "Post with Multiple Images",
    "description": "This post demonstrates uploading multiple images through the API",
    "date": "2025-02-26",
    "author": {
      "name": "John Doe",
      "role": "Developer",
      "image": "john-doe.jpg"
    },
    "content": "## Multiple Images Test\n\nThis post has multiple image attachments.\n\n![Header Image](./header.jpg)\n\nSome content between images...\n\n![Second Image](./diagram.jpg)\n\nMore content here...\n\n![Third Image](./screenshot.png)",
    "images": [
      {
        "filename": "header.jpg",
        "base64Data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/wD+CiHxc8f/AAO/bJ03xJ8MfEWu+G9RXwhZW80+mXskDSxGe5YoxU4ZQwBAPGQK+VB+13+0D/0Vnxx/4Ml/+Ko/4Kf/APJ52j/2JFj/AOlF1X58UAf/2Q=="
      },
      {
        "filename": "diagram.jpg",
        "base64Data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAKAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5/wD+CiHxc8f/AAO/bJ03xJ8MfEWu+G9RXwhZW80+mXskDSxGe5YoxU4ZQwBAPGQK+VB+13+0D/0Vnxx/4Ml/+Ko/4Kf/APJ52j/2JFj/AOlF1X58UAf/2Q=="
      },
      {
        "filename": "screenshot.png",
        "base64Data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQz0AEYBxVSF+FAF5UCu1G/QIWAAAAAElFTkSuQmCC"
      }
    ]
  }'
```

> **Important Notes on base64 Data:**
> - You can include the data URL prefix (`data:image/jpeg;base64,`) or just the base64 string
> - The API handles both formats
> - For large files, be careful of command line limitations - you may need to store the JSON in a file and use `curl -d @file.json` instead
```

#### Revalidating a Path

```bash
curl -X POST https://your-site.com/api/revalidate \
  -H "Authorization: Bearer your-secure-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/blog/my-test-post"
  }'
```

### Testing with Postman

1. **Create a new request**:
   - Set method to `POST`
   - Enter the URL: `https://your-site.com/api/content`

2. **Set Headers**:
   - Key: `Authorization`, Value: `Bearer your-secure-api-key`
   - Key: `Content-Type`, Value: `application/json`

3. **Set Body**:
   - Select `raw` and `JSON` format
   - Paste the following JSON:

```json
{
  "type": "blog",
  "slug": "postman-test",
  "title": "Testing with Postman",
  "description": "This is a test post created using Postman",
  "date": "2025-02-26",
  "author": {
    "name": "Jane Smith",
    "role": "Content Manager",
    "image": "jane-smith.jpg"
  },
  "content": "## Postman Test\n\nThis post was created using Postman to test the API.\n\n1. First item\n2. Second item\n3. Third item",
  "images": []
}
```

4. **For testing with images**:
   - In Postman, you'll need to convert your image to base64
   - You can use online tools or the pre-request script tab with JavaScript
   - Add the base64 string to the `images` array in your JSON body, like this:
   
```json
"images": [
  {
    "filename": "header.jpg",
    "base64Data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA... (base64 data here)"
  },
  {
    "filename": "diagram.jpg",
    "base64Data": "/9j/4AAQSkZJRgABAQEAYABg... (base64 data without prefix)"
  }
]
```

   - Note that the API accepts base64 data with or without the data URL prefix

5. **Save the request** to your Postman collection for reuse

## Environment Variables

Add the following environment variables to your `.env` file:

```
CONTENT_API_KEY=your-secure-api-key
NEXT_PUBLIC_BASE_URL=https://your-site.com
ENABLE_GIT_OPERATIONS=true
GIT_USER_NAME=your-git-username
GIT_USER_EMAIL=your-git-email
```

- **CONTENT_API_KEY**: A secure API key for authenticating requests
- **NEXT_PUBLIC_BASE_URL**: The base URL of your site (used for revalidation)
- **ENABLE_GIT_OPERATIONS**: Set to "true" to enable git operations
- **GIT_USER_NAME** and **GIT_USER_EMAIL**: Git user configuration for commits

## Setting Up n8n Workflow

### Basic Workflow Structure

1. Trigger Node: Choose a trigger (HTTP Request, Schedule, Form submission, etc.)
2. Prepare Content Node: Format the content data
3. HTTP Request Node: Send the content to your API endpoint
4. Error Handling Node: Handle any errors

### Detailed HTTP Request Node Configuration for n8n

#### Content Creation Node

```json
{
  "parameters": {
    "url": "https://your-site.com/api/content",
    "method": "POST",
    "authentication": "headerAuth",
    "headerParameters": {
      "parameters": [
        {
          "name": "Authorization",
          "value": "Bearer {{$env.CONTENT_API_KEY}}"
        },
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "bodyParameters": {
      "parameters": [
        {
          "name": "type",
          "value": "{{$node[\"Prepare Content\"].json[\"type\"]}}"
        },
        {
          "name": "slug",
          "value": "{{$node[\"Prepare Content\"].json[\"slug\"]}}"
        },
        {
          "name": "title",
          "value": "{{$node[\"Prepare Content\"].json[\"title\"]}}"
        },
        {
          "name": "description",
          "value": "{{$node[\"Prepare Content\"].json[\"description\"]}}"
        },
        {
          "name": "date",
          "value": "{{$node[\"Prepare Content\"].json[\"date\"]}}"
        },
        {
          "name": "author",
          "value": "{{$node[\"Prepare Content\"].json[\"author\"]}}"
        },
        {
          "name": "content",
          "value": "{{$node[\"Prepare Content\"].json[\"content\"]}}"
        },
        {
          "name": "images",
          "value": "{{$node[\"Prepare Content\"].json[\"images\"]}}"
        }
      ]
    }
  }
}
```

#### Alternative JSON Format for HTTP Request Node

```json
{
  "parameters": {
    "url": "https://your-site.com/api/content",
    "method": "POST",
    "authentication": "headerAuth",
    "headerParameters": {
      "parameters": [
        {
          "name": "Authorization",
          "value": "Bearer {{$env.CONTENT_API_KEY}}"
        },
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "bodyContentType": "json",
    "body": {
      "type": "{{$node[\"Prepare Content\"].json[\"type\"]}}",
      "slug": "{{$node[\"Prepare Content\"].json[\"slug\"]}}",
      "title": "{{$node[\"Prepare Content\"].json[\"title\"]}}",
      "description": "{{$node[\"Prepare Content\"].json[\"description\"]}}",
      "date": "{{$node[\"Prepare Content\"].json[\"date\"]}}",
      "author": {
        "name": "{{$node[\"Prepare Content\"].json[\"author\"][\"name\"]}}",
        "role": "{{$node[\"Prepare Content\"].json[\"author\"][\"role\"]}}",
        "image": "{{$node[\"Prepare Content\"].json[\"author\"][\"image\"]}}"
      },
      "content": "{{$node[\"Prepare Content\"].json[\"content\"]}}",
      "images": "{{$node[\"Prepare Content\"].json[\"images\"]}}"
    }
  }
}
```

#### Revalidation Node

```json
{
  "parameters": {
    "url": "https://your-site.com/api/revalidate",
    "method": "POST",
    "authentication": "headerAuth",
    "headerParameters": {
      "parameters": [
        {
          "name": "Authorization",
          "value": "Bearer {{$env.CONTENT_API_KEY}}"
        },
        {
          "name": "Content-Type",
          "value": "application/json"
        }
      ]
    },
    "bodyContentType": "json",
    "body": {
      "path": "{{$node[\"HTTP Request\"].json[\"path\"]}}"
    }
  }
}
```

### Handling Images

To include images in your content:

1. Use the n8n Binary Data nodes to read image files
2. Convert images to base64 using the Move Binary Data node
3. Format the images array in the Prepare Content node
4. Reference images in your markdown content using relative paths (e.g., `![Alt text](./image.jpg)`)

#### Example Image Processing Function in n8n

```javascript
// This function processes binary data from image uploads and creates the necessary format
const images = [];
if ($input.item.binary) {
  for (const key in $input.item.binary) {
    images.push({
      filename: $input.item.binary[key].fileName || `image-${key}.jpg`,
      base64Data: $input.item.binary[key].data
    });
  }
}

// Add the processed images to your content data
$input.item.json.images = images;

// Reference the images in your content if needed
if (images.length > 0) {
  // This assumes your content already exists in $input.item.json.content
  if (!$input.item.json.content.includes('![')) {
    $input.item.json.content += '\n\n';
    images.forEach(img => {
      $input.item.json.content += `![Image](${img.filename})\n\n`;
    });
  }
}

return $input.item;
```

## Best Practices

- **Slugs**: Use kebab-case for slugs (e.g., my-new-post)
- **Images**: Optimize images before uploading to reduce file size
- **Content**: Structure your markdown content with proper headings and formatting
- **Security**: Keep your API key secure and consider IP whitelisting
- **Testing**: Test your workflow with a staging environment before using it in production

## Troubleshooting

### Common Issues

- **Authentication Errors**: Ensure your API key is correct and properly formatted in the Authorization header
- **Image Upload Failures**: Check that your base64 data is properly formatted and not truncated
- **Revalidation Issues**: Verify that your NEXT_PUBLIC_BASE_URL is correctly set
- **Git Errors**: Ensure your git credentials are correct and the server has git access

### Debugging

If you encounter issues, check the server logs for detailed error messages. You can also add console.log statements to the API endpoints for additional debugging information.

#### HTTP Status Codes

- **200**: Success
- **400**: Bad Request (missing or invalid parameters)
- **401**: Unauthorized (invalid API key)
- **404**: Not Found
- **500**: Server Error

## Example n8n Workflow

Here's a complete example of an n8n workflow that creates a new blog post from a form submission:

1. Webhook Node: Receives form data
2. Set Node: Formats the slug from the title
3. HTTP Request Node: Fetches images from URLs
4. Move Binary Data Node: Converts images to base64
5. Function Node: Prepares the content data
6. HTTP Request Node: Sends the content to the API
7. If Node: Handles success or error responses

Import this workflow into n8n to get started quickly.

## Conclusion

With this setup, you can dynamically add new content to your NextJS site without manual file creation or deployment. This enables content workflows that can be triggered by various sources, such as form submissions, scheduled events, or integrations with other systems.