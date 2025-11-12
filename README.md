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
- Different views in output like Text, Tree, Form, etc.
- Layout options like Comfortable and Compact
- Font size option
- Full screen mode
  - Input full screen
  - Output full screen
  - Both full screen?
- Expand input or output (like 70% - 30% width to input or output)
- Focus mode - no animation, small font size, full screen, etc. Save it in localstorage

# Learnings

- UX designs using [Google Stich AI](https://stitch.withgoogle.com)
- Material UI
  - Branding customizations like colors and fonts
  - Control customizations
- Animation using [Framer Motion](https://motion.dev/)

## Deployment

[Vaiki product builder](https://stproductbuilderreact.z13.web.core.windows.net/)

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
