# Format:Dev-Tools

A json formatter/validator that does it locally without sending data anywhere.

# Features

## MVP

- Format json string
- Allow pasting in input
- Allow copying in input and output
- Clear button

## Extra features

- Dark theme
- Font size option
- Extra instructions for screen readers for Visually Impaired persons
- Multi-language support

## To be implemented

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

## Deployment

1. `az login --tenant 348db05a-6454-401f-a262-88a9c511d485`
1. `yarn build`
1. `cd dist`
1. ```
   az storage blob upload-batch \
       --account-name stformatdevtools \
       --destination '$web' \
       --source . \
       --overwrite
   ```
