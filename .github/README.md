# GitHub Actions

This directory contains GitHub Actions workflows for automating various tasks in this repository.

## Workflows

### Deploy to GitHub Pages (`deploy.yml`)

This workflow automatically deploys the website to GitHub Pages whenever changes are pushed to the `main` branch.

#### Setup Instructions

To enable GitHub Pages deployment for this repository, follow these steps:

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Save the changes

Once configured, the workflow will automatically deploy your site whenever you push to the `main` branch.

#### Manual Deployment

You can also trigger a deployment manually:

1. Go to the **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click the "Run workflow" button
4. Select the branch and click "Run workflow"

#### Accessing Your Deployed Site

After the workflow runs successfully, your site will be available at:
```
https://<username>.github.io/<repository-name>/
```

For this repository:
```
https://emart-ai.github.io/french-accelerated/
```

#### What Gets Deployed

The workflow deploys all files in the repository root to GitHub Pages. Make sure your `index.html` is in the root directory for the site to work properly.

#### Troubleshooting

- **404 Error**: Ensure `index.html` exists in the repository root
- **Workflow Fails**: Check the Actions tab for error details
- **Site Not Updating**: Wait a few minutes for GitHub's CDN to update, or try a hard refresh (Ctrl+Shift+R)
