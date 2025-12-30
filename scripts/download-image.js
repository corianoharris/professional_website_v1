#!/usr/bin/env node

/**
 * Script to download an image from a URL and save it to the public folder
 * Usage: node scripts/download-image.js <image-url> <output-filename>
 * Example: node scripts/download-image.js https://images.unsplash.com/photo-xxx accessibility-inclusion.jpg
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const imageUrl = process.argv[2];
const outputFilename = process.argv[3];

if (!imageUrl || !outputFilename) {
  console.error('Usage: node scripts/download-image.js <image-url> <output-filename>');
  console.error('Example: node scripts/download-image.js https://images.unsplash.com/photo-xxx accessibility-inclusion.jpg');
  process.exit(1);
}

const outputPath = path.join(__dirname, '..', 'public', outputFilename);
const protocol = imageUrl.startsWith('https') ? https : http;

console.log(`Downloading image from: ${imageUrl}`);
console.log(`Saving to: ${outputPath}`);

const file = fs.createWriteStream(outputPath);

protocol.get(imageUrl, (response) => {
  if (response.statusCode === 301 || response.statusCode === 302) {
    // Handle redirects
    return downloadImage(response.headers.location, outputPath);
  }
  
  if (response.statusCode !== 200) {
    console.error(`Error: Received status code ${response.statusCode}`);
    fs.unlinkSync(outputPath);
    process.exit(1);
  }

  response.pipe(file);
  
  file.on('finish', () => {
    file.close();
    console.log(`✅ Image downloaded successfully: ${outputPath}`);
  });
}).on('error', (err) => {
  fs.unlinkSync(outputPath);
  console.error(`Error downloading image: ${err.message}`);
  process.exit(1);
});

function downloadImage(url, outputPath) {
  const protocol = url.startsWith('https') ? https : http;
  const file = fs.createWriteStream(outputPath);
  
  protocol.get(url, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`✅ Image downloaded successfully: ${outputPath}`);
    });
  }).on('error', (err) => {
    fs.unlinkSync(outputPath);
    console.error(`Error downloading image: ${err.message}`);
    process.exit(1);
  });
}

