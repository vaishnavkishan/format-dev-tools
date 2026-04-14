# Format:Dev-Tools

A collection of privacy-focused developer tools that process data locally in your browser without sending it to external servers.

# Local development

- Clone the repo
- Make sure Node and Yarn are installed
- Tested with:
  - Node `v25.8.2`
  - Yarn `1.22.22`
  - React `19.1.1`
- Run `yarn install`
- Run `yarn run dev`

# Features

## JSON Formatter/Validator

- Format json string
- Allow pasting in input
- Allow copying in input and output
- Clear button

## Markdown Preview

- **Real-time Visualization**: Compose or paste Markdown and see the rendered output instantly.
- **Local Processing**: All parsing and rendering are done in the browser to ensure data privacy.
- **Rich Formatting**: Support for headers, bold/italic, lists, tables, and blockquotes.
- **Syntax Highlighting**: Beautiful code blocks within your Markdown.
- **Dual-Tab Output**: View the rendered HTML preview or the raw formatted Markdown source.
- **Layout Options**: Choose between "Split View" (Editor and Preview side-by-side) or "Tabbed View".
- **Security**: Sanitized HTML rendering to prevent XSS attacks.
- **Persistence**: Automatically saves your work-in-progress to local storage.

## Extra features

- Dark theme
- Font size option
- Extra instructions for screen readers for Visually Impaired persons
- Multi-language support using `i18next`
- Local storage sync for state persistence (aligned with "Focus Mode")
- Tooltips and Keyboard shortcuts for common actions (e.g., Clear, Paste, Switch Views)
- Always sanitize the input of both JSON and markdown
- **Image Handling**: Privacy-safe placeholders or CSP warning systems for external images.
- Do not show split button in small screen where it is not supported
- Show error details button in action bar when there is an error in input JSON

## To be implemented

- circle shadow on button hover
- help users identify errors by showing current line number and column. highlight error segment
- validate markdown
- allow users to download/install the app as spa, so that it works even when offline

### JSON Specific

- Layout options like Comfortable and Compact
- Different views in output like Text, Tree, Form, etc.
- Full screen mode
  - Input full screen
  - Output full screen
  - Both full screen?
- Expand input or output (like 70% - 30% width to input or output)
- Focus mode - no animation, small font size, full screen, etc. Save it in localstorage

# Learnings

- UX designs using [Google Stitch AI](https://stitch.withgoogle.com)
- Material UI
  - Branding customizations like colors and fonts using [Material-UI Theme Creator](https://bareynol.github.io/mui-theme-creator/).
  - Control customizations
- Animation using [Framer Motion](https://motion.dev/)
- Accessibility using ARIA tags
- Support for multiple languages using i18n library

## Deployment

1. `az login --tenant 348db05a-6454-401f-a262-88a9c511d485`
1. ```
   yarn build
   cd dist
   az storage blob upload-batch \
   --account-name stformatdevtools \
   --destination '$web' \
   --source dist \
   --overwrite
   ```

## Docker & Azure Container Apps

This project includes a production Dockerfile that builds the app with Yarn and serves the generated static site through NGINX.

### Build and push to Docker Hub

1. Build the Docker image locally:
   ```bash
   docker build -t <dockerhub-username>/format-dev-tools:latest .
   ```
2. Log in to Docker Hub:
   ```bash
   docker login
   ```
3. Push the image to Docker Hub:
   ```bash
   docker push <dockerhub-username>/format-dev-tools:latest
   ```

### Deploy to Azure Container Apps

1. Make sure you have an Azure Container Apps environment and resource group ready.
2. Create the container app using your Docker Hub image:
   ```bash
   az containerapp create \
     --name format-dev-tools \
     --resource-group <resource-group> \
     --environment <container-app-environment> \
     --image <dockerhub-username>/format-dev-tools:latest \
     --target-port 80 \
     --ingress external
   ```
3. To redeploy after changes, rebuild and push the image, then update the container app:
   ```bash
   docker build -t <dockerhub-username>/format-dev-tools:latest .
   docker push <dockerhub-username>/format-dev-tools:latest
   az containerapp update \
     --name format-dev-tools \
     --resource-group <resource-group> \
     --image <dockerhub-username>/format-dev-tools:latest
   ```

> If your Docker Hub repository is private, add registry credentials to Azure Container Apps with `--registry-server`, `--registry-username`, and `--registry-password`.
