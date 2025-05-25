#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to GitHub Pages
echo "🚀 Deploying to GitHub Pages..."
# The GitHub Actions workflow will handle the actual deployment

echo "✅ GitHub Pages deployment initiated! Check the Actions tab in your GitHub repository for progress."

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
if ! command -v netlify &> /dev/null; then
    echo "Netlify CLI not found. Installing..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
netlify deploy --prod

echo "✅ Deployment process completed!"
echo "🔗 GitHub Pages: https://<your-github-username>.github.io/UFC-Predicts"
echo "🔗 Netlify URL: Check the output above for your Netlify URL"
