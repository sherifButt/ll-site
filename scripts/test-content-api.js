#!/usr/bin/env node

/**
 * Test script for the dynamic content API
 * 
 * Usage:
 * node scripts/test-content-api.js
 * 
 * Make sure to set the required environment variables in .env file or pass them as arguments:
 * - CONTENT_API_KEY: API key for authentication
 * - NEXT_PUBLIC_BASE_URL: Base URL of the site
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Load environment variables from .env file if it exists
try {
  const dotenv = require('dotenv');
  dotenv.config();
} catch (error) {
  console.log('dotenv not installed, skipping .env file loading');
}

// Configuration
const config = {
  apiKey: process.env.CONTENT_API_KEY || 'your-api-key',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3004',
  gitAccessToken: process.env.GIT_ACCESS_TOKEN || '',
  type: 'blog', // 'blog' or 'work'
  slug: `test-post-${Date.now()}`,
  title: 'Test Post',
  description: 'This is a test post created by the test script',
  date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
  author: {
    name: 'Test Author',
    role: 'Tester',
    image: 'sherif-butt.jpg' // This should be an existing image in src/images/team/
  },
  content: `## Test Post

This is a test post created by the test script.

It includes some **bold text** and *italic text*.

### Subheading

- List item 1
- List item 2
- List item 3

> This is a blockquote

\`\`\`javascript
// This is a code block
function hello() {
  console.log('Hello, world!');
}
\`\`\`
`,
  images: [] // No images in this test
};

// Parse command line arguments
process.argv.slice(2).forEach(arg => {
  const [key, value] = arg.split('=');
  if (key && value) {
    if (key === 'author') {
      try {
        config.author = JSON.parse(value);
      } catch (error) {
        console.error('Invalid author JSON:', error);
      }
    } else if (key === 'images') {
      try {
        config.images = JSON.parse(value);
      } catch (error) {
        console.error('Invalid images JSON:', error);
      }
    } else {
      config[key] = value;
    }
  }
});

// Validate configuration
if (!config.apiKey) {
  console.error('Error: CONTENT_API_KEY is required');
  process.exit(1);
}

if (!config.baseUrl) {
  console.error('Error: NEXT_PUBLIC_BASE_URL is required');
  process.exit(1);
}

// Prepare request data
const requestData = {
  type: config.type,
  slug: config.slug,
  title: config.title,
  description: config.description,
  date: config.date,
  author: config.author,
  content: config.content,
  images: config.images
};

// Make the request
console.log(`Testing content API at ${config.baseUrl}/api/content`);
console.log(`Creating ${config.type} post with slug: ${config.slug}`);

const requestBody = JSON.stringify(requestData);
const url = new URL('/api/content', config.baseUrl);
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(requestBody),
    'Authorization': `Bearer ${config.apiKey}`
  }
};

const client = url.protocol === 'https:' ? https : http;

const req = client.request(url, options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Status: ${res.statusCode}`);
    
    try {
      const response = JSON.parse(data);
      console.log('Response:', JSON.stringify(response, null, 2));
      
      if (res.statusCode === 200 && response.success) {
        console.log('\nSuccess! The content was created successfully.');
        console.log(`You can view it at: ${config.baseUrl}${response.path}`);
        
        // Test revalidation
        console.log('\nTesting revalidation...');
        testRevalidation(response.path);
      } else {
        console.error('\nError: The content was not created successfully.');
      }
    } catch (error) {
      console.error('Error parsing response:', error);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error);
});

req.write(requestBody);
req.end();

// Test revalidation
function testRevalidation(path) {
  const revalidateData = JSON.stringify({ path });
  const revalidateUrl = new URL('/api/revalidate', config.baseUrl);
  const revalidateOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(revalidateData),
      'Authorization': `Bearer ${config.apiKey}`
    }
  };
  
  const client = revalidateUrl.protocol === 'https:' ? https : http;
  
  const req = client.request(revalidateUrl, revalidateOptions, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`Revalidation status: ${res.statusCode}`);
      
      try {
        const response = JSON.parse(data);
        console.log('Revalidation response:', JSON.stringify(response, null, 2));
        
        if (res.statusCode === 200 && response.success) {
          console.log('\nSuccess! The path was revalidated successfully.');
        } else {
          console.error('\nError: The path was not revalidated successfully.');
        }
      } catch (error) {
        console.error('Error parsing revalidation response:', error);
        console.log('Raw revalidation response:', data);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error('Revalidation request error:', error);
  });
  
  req.write(revalidateData);
  req.end();
}
