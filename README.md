# Live CV Maker

A client-side React application for building resumes with a live preview and DOCX export capability. This project is intended as a clean, educational codebase demonstrating deterministic document generation from structured forms.

## What This Project Is / Is Not

### It is:
- A browser-based tool for creating ATS-friendly CVs.
- An English-only interface (intentionally locked).
- A demonstration of React state management and `docx` library integration.
- Licensed under MIT for educational and personal use.

### It is not:
- A production-hardened SaaS platform.
- A persistent storage solution (data is lost on page refresh unless exported).
- A multi-language or highly customizable template engine.
- A PDF generator (DOCX only).

## Tech Stack

- **React**: UI library.
- **TypeScript**: Type safety and data modeling.
- **Vite**: Build tool and dev server.
- **docx**: Library for generating `.docx` files from JavaScript/TypeScript.

## Architecture Overview

The project follows a simplicity-first approach with literal naming and colocation of related logic.

- `src/context/`: Manages global state, including CV data and basic UI toggles.
- `src/data/`: Contains static strings, constants, and mock data used for "smart placeholders."
- `src/forms/`: Multi-step form components for data entry (Experience, Education, etc.).
- `src/preview/`: Handles real-time CV rendering and the logic for document export.
- `src/types/`: Centralized TypeScript interfaces for the CV data model.
- `src/ui/`: Low-level, reusable UI components (buttons, inputs, etc.).
- `src/utils/`: Minimal, generic helper functions.

## Running the Project Locally

To run the project in a development environment:

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start the development server**:
    ```bash
    npm run dev
    ```
3.  **Open the application**:
    Access the local URL (usually `http://localhost:5173`) in your browser.

## Export Behavior

The export functionality is strictly limited to **DOCX**. When the "Export" button is triggered, the application maps the current state to a deterministic document structure defined in the `preview/` logic. 

**Note on PDF:** There is no native PDF export. Users requiring a PDF should use the "Save as PDF" feature within Microsoft Word or any compatible DOCX reader after exporting.

## License

This project is licensed under the **MIT License**.
