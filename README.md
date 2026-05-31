# Sam (Mutasem Elayyoub) Ayoub Portfolio

This is a professional portfolio website for Sam Ayoub, showcasing his expertise in software architecture, migration & integration consulting, and AI engineering.

## Live Demo
https://sam.reallexi.com

## Features
- Modern responsive design with glassmorphism dark theme
- 3D virtual office experience using Three.js
- AI chat assistant powered by NVIDIA NIM API
- SEO optimized with complete meta tags
- Fully responsive for all devices

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
1. Fork this repository
2. Clone your fork locally
3. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

### Configuration
1. Create a `.env` file in the root directory:
   ```
   REACT_APP_NVD_TOKEN=nvapi-your-token-here
   ```

2. Add your NVIDIA API token as a GitHub secret for deployment:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `REACT_NVD_TOKEN`
   - Value: Your actual NVIDIA API token

### Development
```bash
npm start
```

### Build
```bash
npm run build
```

## Customization
Update the following files with your information:
- `public/assets/resume.json` - Professional resume data
- `package.json` - Personal information and metadata
- `src/components/Office3D.js` - Office layout and content

## Deployment
This portfolio is configured for deployment to GitHub Pages. The build process automatically embeds the API token from the `REACT_APP_NVD_TOKEN` environment variable.

## AI Chat
The AI chat assistant uses NVIDIA's LLM API for enhanced responses. The chat prioritizes information from your resume data first, then uses external knowledge.

**Note:** The AI chat works in both development (`npm start`) and production builds. The implementation includes a fallback to a public CORS proxy in case direct API calls fail due to browser CORS preflight restrictions. For production deployment, ensure your GitHub repository has the `REACT_NVD_TOKEN` secret configured.

## License
MIT License