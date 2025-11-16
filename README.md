# Tencent LVC UI

A video production and live clipping web application.

## Deployment to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Method 2: Using Vercel Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. **Click "Add New Project"**

4. **Import your repository**

5. **Configure the project**:
   - Framework Preset: Other
   - Root Directory: `./` (or leave default)
   - Build Command: (leave empty for static sites)
   - Output Directory: (leave empty)

6. **Click "Deploy"**

### Method 3: Using GitHub Integration

1. **Connect your GitHub account** to Vercel

2. **Import the repository** from GitHub

3. **Vercel will automatically detect** it's a static site and deploy

4. **Future pushes** to your main branch will automatically trigger deployments

## Project Structure

- `home.html` - Home page
- `producer.html` - Producer page
- `live-clipping.html` - Live clipping page with video editing
- `editor.html` - Editor page
- `campaign.html` - Campaign management page
- `organization.html` - Organization page
- `styles.css` - Main stylesheet
- `script.js` - Main JavaScript file

## Routes

The application supports the following routes:
- `/` or `/home` → `home.html`
- `/producer` → `producer.html`
- `/live-clipping` → `live-clipping.html`
- `/editor` → `editor.html`
- `/campaign` → `campaign.html`
- `/organization` → `organization.html`

## Notes

- All static assets (CSS, JS, images) are served directly
- The `vercel.json` file configures routing and caching
- No build process is required - this is a pure static site

