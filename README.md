# Format:Dev-Tools

A collection of privacy-focused developer tools that process data locally in your browser without sending it to external servers.

# Local development

- Clone the repo
- Make sure node and yarn is installed
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

## To be implemented

- **Image Handling**: Privacy-safe placeholders or CSP warning systems for external images.
- **Export Options**: Exporting rendered markdown to PDF or styled HTML files.

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
