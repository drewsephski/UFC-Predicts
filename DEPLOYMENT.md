# Deployment Guide

This guide explains how to deploy the UFC Predicts application to both GitHub Pages and Netlify.

## Prerequisites

- Node.js (v18 or later)
- npm (v9 or later) or yarn
- Git
- GitHub account (for GitHub Pages)
- Netlify account (for Netlify deployment)

## GitHub Pages Deployment

### 1. Configure GitHub Repository

1. Make sure your repository is pushed to GitHub
2. Go to your repository settings on GitHub
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select "GitHub Actions"

### 2. Push Changes

Push your code to the `main` branch. The GitHub Action workflow will automatically build and deploy your site.

### 3. Verify Deployment

After the workflow completes (check the Actions tab), your site will be available at:
`https://<your-username>.github.io/UFC-Predicts`

## Netlify Deployment

### 1. Manual Deployment

1. Go to [Netlify](https://www.netlify.com/) and sign in
2. Click on "Add new site" > "Import an existing project"
3. Connect to your GitHub repository
4. Configure the build settings:
   - Build command: `npm run build`q
   - Publish directory: `out`
5. Click "Deploy site"

### 2. Environment Variables

If you have any environment variables, add them in the Netlify dashboard:
1. Go to "Site settings" > "Build & deploy" > "Environment"
2. Add your environment variables

### 3. Custom Domain (Optional)

1. Go to "Domain management"
2. Click "Add custom domain"
3. Follow the instructions to configure your domain

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### GitHub Pages
- If you see a 404 error, wait a few minutes and refresh
- Check the GitHub Actions workflow for any build errors
- Ensure the `basePath` in `next.config.js` matches your repository name

### Netlify
- Check the deployment logs in the Netlify dashboard
- Ensure the build command and publish directory are correctly set
- Verify environment variables are properly configured

## Security Considerations

- Never commit sensitive information (API keys, secrets) to version control
- Use environment variables for configuration
- Keep dependencies up to date
- Regularly audit your site's security headers

## Support

For additional help, please open an issue in the repository.
