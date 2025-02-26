# n8n Workflow Guide for Dynamic Content

This guide provides step-by-step instructions for setting up an n8n workflow to dynamically add content to your NextJS site.

## Prerequisites

1. An n8n instance (self-hosted or cloud)
2. Your NextJS site deployed with the content API endpoints
3. Environment variables configured on your site:
   - `CONTENT_API_KEY`
   - `NEXT_PUBLIC_BASE_URL`
   - `ENABLE_GIT_OPERATIONS` (optional)
   - `GIT_USER_NAME` (optional)
   - `GIT_USER_EMAIL` (optional)

## Setting Up the n8n Workflow

### Step 1: Create a New Workflow

1. Log in to your n8n instance
2. Click on "Workflows" in the sidebar
3. Click "Create new" to create a new workflow
4. Name your workflow (e.g., "Add Blog Post")

### Step 2: Add a Trigger Node

You can use various trigger nodes depending on your needs:

#### Option A: Webhook Trigger (for form submissions)

1. Add a "Webhook" node
2. Configure it as follows:
   - Authentication: None (or add authentication if needed)
   - HTTP Method: POST
   - Path: /blog-submission (or any path you prefer)
3. Click "Execute Node" to generate a webhook URL
4. Use this URL in your form submission

#### Option B: Schedule Trigger (for periodic content)

1. Add a "Schedule" node
2. Configure it to run at your desired interval (e.g., daily, weekly)

#### Option C: Manual Trigger (for manual content addition)

1. Add a "Manual" node
2. Configure input fields for your content (title, description, content, etc.)

### Step 3: Format the Slug

1. Add a "Set" node after your trigger node
2. Configure it to create a slug from the title:
   ```
   {
     "slug": "{{$json.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}}"
   }
   ```

### Step 4: Prepare Content Data

1. Add a "Function" node
2. Use this code to prepare your content data:

```javascript
return {
  json: {
    type: "blog", // or "work"
    slug: $input.item.json.slug,
    title: $input.item.json.title,
    description: $input.item.json.description,
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    author: {
      name: "Author Name", // Replace with actual author name or make dynamic
      role: "Author Role", // Replace with actual role or make dynamic
      image: "author-name.jpg" // Reference to an image in src/images/team/
    },
    content: $input.item.json.content,
    images: [] // Will be populated if you have image processing nodes
  }
};
```

### Step 5: Process Images (Optional)

If your content includes images:

1. Add an "HTTP Request" node to fetch images from URLs or use "Read Binary File" for local files
2. Add a "Move Binary Data" node to convert images to base64
3. Add another "Function" node to format the images array:

```javascript
// Assuming binary data is available from previous nodes
const images = [];
if ($input.item.binary) {
  for (const key in $input.item.binary) {
    images.push({
      filename: $input.item.binary[key].fileName || `image-${key}.jpg`,
      base64Data: $input.item.binary[key].data
    });
  }
}

// Add images to the content data
$input.item.json.images = images;

return $input.item;
```

### Step 6: Send Content to API

1. Add an "HTTP Request" node
2. Configure it as follows:
   - Method: POST
   - URL: `{{$env.SITE_URL}}/api/content` (set SITE_URL in n8n environment variables)
   - Authentication: Header Auth
   - Header Auth Name: Authorization
   - Header Auth Value: Bearer {{$env.CONTENT_API_KEY}} (set CONTENT_API_KEY in n8n environment variables)
   - Content Type: JSON
   - Request Body: JSON
   - JSON Body:
     ```
     {
       "type": "{{$json.type}}",
       "slug": "{{$json.slug}}",
       "title": "{{$json.title}}",
       "description": "{{$json.description}}",
       "date": "{{$json.date}}",
       "author": {
         "name": "{{$json.author.name}}",
         "role": "{{$json.author.role}}",
         "image": "{{$json.author.image}}"
       },
       "content": "{{$json.content}}",
       "images": {{$json.images}}
     }
     ```

### Step 7: Handle Response

1. Add an "IF" node
2. Set the condition to check if the request was successful:
   ```
   {{$json.success}} == true
   ```
3. For the "true" path, add a "Slack" or "Email" node to notify of success
4. For the "false" path, add a "Slack" or "Email" node to notify of failure

### Step 8: Save and Activate

1. Click "Save" to save your workflow
2. Toggle the "Active" switch to activate your workflow

## Testing Your API Directly with cURL

Before building your entire workflow, you may want to test the API endpoints directly. Here's how to do it with cURL:

### Testing the Content API with cURL

```bash
curl -X POST \
  https://your-site-url.com/api/content \
  -H 'Authorization: Bearer your-content-api-key' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "blog",
    "slug": "my-test-blog-post",
    "title": "My Test Blog Post",
    "description": "This is a test blog post created via API",
    "date": "2025-02-26",
    "author": {
      "name": "John Doe",
      "role": "Content Writer",
      "image": "john-doe.jpg"
    },
    "content": "## Hello World\n\nThis is a test blog post created with cURL to test the API.\n\n* Point 1\n* Point 2\n* Point 3",
    "images": []
  }'
```

### Testing with Images (Using Base64)

For including images, you need to encode them as base64:

```bash
# First, encode your image to base64
IMAGE_BASE64=$(base64 -i /path/to/your/image.jpg)

# Then use it in your cURL request
curl -X POST \
  https://your-site-url.com/api/content \
  -H 'Authorization: Bearer your-content-api-key' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "blog",
    "slug": "my-test-with-image",
    "title": "My Test With Image",
    "description": "Testing with an image attachment",
    "date": "2025-02-26",
    "author": {
      "name": "John Doe",
      "role": "Content Writer",
      "image": "john-doe.jpg"
    },
    "content": "## Hello World\n\nThis is a test blog post with an image.\n\n![Featured Image](./featured-image.jpg)",
    "images": [
      {
        "filename": "featured-image.jpg",
        "base64Data": "'$IMAGE_BASE64'"
      }
    ]
  }'
```

### Checking Content Status

You can also check the status of your content with a GET request:

```bash
curl -X GET \
  https://your-site-url.com/api/content/blog/my-test-blog-post \
  -H 'Authorization: Bearer your-content-api-key'
```

## Example: Blog Post Submission Form Workflow

Here's a complete example of a workflow that processes a blog post submission form:

### Nodes:

1. **Webhook**: Receives form data
   - Method: POST
   - Path: /blog-submission

2. **Set**: Creates slug from title
   ```
   {
     "slug": "{{$json.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}}"
   }
   ```

3. **HTTP Request**: Fetches image from URL (if provided)
   - Method: GET
   - URL: {{$json.imageUrl}}
   - Response Format: File

4. **Move Binary Data**: Converts image to base64
   - Input Name: data
   - Destination Key: data
   - Source Key: binary

5. **Function**: Prepares content data
   ```javascript
   const images = [];
   if ($input.item.binary && $input.item.binary.data) {
     images.push({
       filename: "featured-image.jpg",
       base64Data: $input.item.binary.data.data
     });
   }

   // Format markdown content with image reference
   let content = `## ${$input.item.json.title}\n\n`;
   content += $input.item.json.content;
   
   // Add image reference if we have an image
   if (images.length > 0) {
     content += '\n\n![Featured Image](./featured-image.jpg)';
   }

   return {
     json: {
       type: "blog",
       slug: $input.item.json.slug,
       title: $input.item.json.title,
       description: $input.item.json.description || $input.item.json.title,
       date: new Date().toISOString().split('T')[0],
       author: {
         name: "Site Admin",
         role: "Administrator",
         image: "sherif-butt.jpg" // Replace with an actual image in your team folder
       },
       content: content,
       images: images
     }
   };
   ```

6. **HTTP Request**: Sends content to API
   - Method: POST
   - URL: {{$env.SITE_URL}}/api/content
   - Authentication: Header Auth
   - Header Auth Name: Authorization
   - Header Auth Value: Bearer {{$env.CONTENT_API_KEY}}
   - Content Type: JSON
   - JSON Body: (as shown in Step 6 above)

7. **IF**: Checks if request was successful
   - Condition: {{$json.success}} == true

8. **Slack**: Sends success notification (true path)
   - Channel: #content-updates
   - Message: New blog post created: {{$node["HTTP Request"].json.path}}

9. **Slack**: Sends failure notification (false path)
   - Channel: #content-updates
   - Message: Failed to create blog post: {{$node["HTTP Request"].json.error}}

## Testing Your Workflow

1. Activate your workflow
2. Trigger it based on your trigger type:
   - For Webhook: Send a POST request to the webhook URL
   - For Schedule: Wait for the scheduled time or execute manually
   - For Manual: Click "Execute Workflow" and provide the input data
3. Check the execution results in n8n
4. Verify that the content appears on your site

## Troubleshooting

### Common Issues

1. **Authentication Errors**:
   - Check that your CONTENT_API_KEY is correctly set in n8n environment variables
   - Verify the Authorization header format (should be `Bearer your-api-key`)
   - Test your API key directly with cURL to confirm it works

2. **Image Processing Issues**:
   - Ensure binary data is correctly processed
   - Check that base64 data is properly formatted
   - Verify image references in markdown content match the filenames

3. **Content Formatting Issues**:
   - Escape special characters in JSON strings
   - Use proper markdown syntax for content
   - Ensure all required fields are provided

### Debugging Tips

1. Use the "Debug" node between steps to inspect data
2. Check execution logs in n8n for detailed error messages
3. Test API endpoints directly using cURL or a tool like Postman before integrating with n8n

## Advanced Configurations

### Multi-Step Approval Workflow

You can create a multi-step approval workflow:

1. Form submission triggers the workflow
2. Content is saved to a temporary storage (e.g., n8n variable)
3. Approval request is sent to an admin (e.g., via Slack or Email)
4. Admin approves or rejects
5. If approved, content is sent to the API

### Content Scheduling

To schedule content for future publication:

1. Add a date picker to your form for the publication date
2. In your workflow, compare the publication date with the current date
3. If the publication date is in the future, store the content in a database
4. Create a scheduled workflow that checks for content with today's publication date
5. Publish the content when the publication date is reached

## Conclusion

With this n8n workflow, you can automate the process of adding content to your NextJS site. This enables various content workflows, such as accepting submissions from forms, scheduling content publication, or integrating with other content sources.

For more information on the content API, refer to the [Dynamic Content Guide](./dynamic-content-guide.md).