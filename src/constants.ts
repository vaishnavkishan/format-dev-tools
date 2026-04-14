export const DefaultJson = `
{
  "string":"Hello World",
    "number": 123,
  "array": [1, 2,3],
    "object": {"a": "b", "c": "d"
  },
  "boolean":true,
  "null": null
  }
    `;

export const DefaultMarkdown = `# Markdown Preview

Welcome to the **Format:Dev-Tools** Markdown editor! All rendering happens locally in your browser.

## Text Formatting

You can use **Bold**, *Italics*, or ~~Strikethrough~~ text. You can also combine them, like ***Bold and Italic***.

## Lists

### Unordered List
- Item 1
- Item 2
  - Sub-item A
  - Sub-item B

### Ordered List
1. First Step
2. Second Step
3. Third Step

### Task List
- [x] Core Markdown support
- [x] GFM Features (Tables, Task lists)
- [ ] Cloud sync (Privacy First - strictly local!)

## Blockquotes

> "Privacy is not an option, and it shouldn't be the price we accept for just getting on the internet." — *Gary Kovacs*

## Code

Inline code like \`const x = 10;\` is supported. 

### Syntax Highlighting
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
greet('Developer');
\`\`\`

## Tables

| Feature | Status | Location |
| :--- | :---: | :--- |
| Rendering | Local | Browser |
| Privacy | High | Client-side |
| Styling | MUI | Theme-aware |

## Links and Images

### Image

![Image Sample](https://stformatdevtools.z13.web.core.windows.net/logo.svg)

### Link

[Link Sample](https://www.linkedin.com/in/kishan-vaishnav/)
---
`;
