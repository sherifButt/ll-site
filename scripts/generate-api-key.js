#!/usr/bin/env node

/**
 * Generate a secure API key for the content API
 * 
 * Usage:
 * node scripts/generate-api-key.js [length]
 * 
 * Arguments:
 * - length: (optional) The length of the API key (default: 32)
 */

// Parse command line arguments
const args = process.argv.slice(2);
const length = parseInt(args[0]) || 32;

// Generate a secure random API key
function generateSecureKey(length) {
  const crypto = require('crypto');
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// Generate the API key
const apiKey = generateSecureKey(length);

// Print the API key
console.log('\nGenerated API Key:');
console.log('------------------');
console.log(apiKey);
console.log('\nAdd this to your .env file:');
console.log('---------------------------');
console.log(`CONTENT_API_KEY=${apiKey}`);
console.log('\n');
