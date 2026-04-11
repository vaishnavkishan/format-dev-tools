# PRD: Markdown Preview Feature

## 1. Overview

The Markdown Preview feature allows developers to compose, paste, and visualize Markdown text in real-time. Following the core philosophy of **Format:Dev-Tools**, all processing and rendering must happen locally in the browser to ensure data privacy.

## 2. Target Audience

Developers and technical writers who need a quick, private way to preview READMEs, documentation snippets, or GitHub comments without uploading data to external servers.

## 4. Functional Requirements

### 4.1 Markdown Editor (Input)

- **Text Input**: A multi-line text area optimized for code/markdown.
- **Clear Action**: A button to wipe both the input and the preview.
- **Paste Action**: A button to paste contents of clipboard.
- **Persistence**: local storage sync to save work-in-progress (aligned with "Focus Mode" goals). Load from local storage on page load.

### 4.2 Real-time Preview (Output)

- **Rendering**: Convert Standard Markdown to HTML.
- **Styling**: Rendered output should support:
  - Headers, Bold, Italic.
  - Lists (Ordered/Unordered).
  - Code blocks with syntax highlighting.
  - Tables and blockquotes.
- **Privacy**: No external network calls for rendering. External images should be handled gracefully (potentially blocked or warned via CSP).
- **Layout**: Two MUI tabs, one for HTML preview another for formatted markdown raw text.

### 4.4 Internationalization (i18n)

- **Multi-language Support**: All UI strings (labels, buttons, tooltips, placeholders) must be managed via `i18next`.

### 4.5 Routing

- **Route Path**: The Markdown Preview tool must be accessible at the `/md-preview` path within the application.

### 4.3 Action Bar

- **Copy Markdown**: Copies the raw formatted markdown source text to the clipboard.
- **Copy Preview**: Copies the rendered HTML output to the clipboard.
- **Toggle View**: Options for "Split View" (Editor | Preview) or "Tabbed View" (Editor / Preview).

## 5. UI/UX Design

- **Layout**: Responsive. Default to a 50/50 split on desktop and a tabbed view on mobile.
- **Themes**: Must support the existing Dark/Light theme system.
- **Accessibility**:
  - High contrast for code blocks.
  - ARIA live regions for screen readers to announce rendering updates if necessary.
  - Keyboard navigation between the editor and the action buttons.

## 6. Technical Requirements

- **Markdown Parser**: Use a lightweight, secure library like `remark` or `markdown-it`.
- **Syntax Highlighting**: Use `prismjs` or `highlight.js` for code blocks within the markdown.
- **Sanitization**: All rendered HTML must be sanitized (using a library like `DOMPurify`) to prevent XSS attacks when users paste malicious markdown.

## 7. Implementation Tasks

1. [ ] **Setup & Dependencies**: Install `react-markdown`, `remark-gfm` (for tables/lists), `rehype-highlight`, and `dompurify`.
2. [ ] **State & Persistence**: Implement a `useLocalStorage` hook to sync editor content and "Toggle View" preferences.
3. [ ] **Core Layout & Routing**: Create `MarkdownPreview` with a responsive split-pane/tabbed system using MUI and configure the `/md-preview` route.
4. [ ] **Editor Implementation**:
   - [ ] Build multi-line input with "Paste from Clipboard" and "Clear" actions.
   - [ ] Add keyboard shortcuts (e.g., Ctrl+V for paste, Alt+C for clear).
5. [ ] **Rendering Pipeline**:
   - [ ] Integrate parser with real-time state updates.
   - [ ] Implement `DOMPurify` sanitization layer.
     - [ ] Configure syntax highlighting for code blocks within the HTML preview.
     - [ ] Create the dual-tab preview interface (HTML Preview vs. Raw Markdown View).
   - [ ] Implement image handling logic (privacy-safe placeholders or CSP warnings).
6. [ ] **Action Bar & UI Enhancements**:
   - [ ] Implement "Copy Markdown" (Plain text) and "Copy Preview" (Rich Text/HTML).
   - [ ] Implement "Toggle View" logic (Split vs Tabbed).
     - [ ] Add `Tooltip` components to all action buttons and tabs providing helpful descriptions and respective shortcut key info (e.g., "Clear Editor (Alt+C)", "Switch to HTML Preview (Ctrl+Shift+P)").
     - [ ] Define and implement all localized strings in `translation.json` files for supported languages.
7. [ ] **Theming & A11y**:
   - [ ] Map MUI theme variables to the Markdown preview (headers, blockquotes, links).
   - [ ] Ensure high-contrast ratios for code blocks in both light/dark modes.
   - [ ] Add ARIA live regions for rendering status and screen reader instructions.

## 8. Success Metrics

- **Zero Latency**: Real-time rendering should feel instantaneous for documents under 5,000 lines.
- **Privacy Compliance**: Zero network requests triggered by the markdown parser.
