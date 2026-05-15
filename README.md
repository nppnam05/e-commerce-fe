# E-Commerce Frontend

A modern, high-performance E-commerce frontend built with React 19, Vite, and Redux Toolkit. This project focuses on a clean architecture, premium UI/UX, and robust state management.

## 🚀 Description

This is the frontend application for a comprehensive E-commerce platform. It features a secure authentication system with JWT handling (including silent refresh and auto-login), a responsive layout designed with modern aesthetics, and a modular architecture that separates UI components from business logic and API interactions.

## 📂 Folder Structure

```text
src/
├── assets/             # Static assets like images and icons
├── components/         # Reusable React components
│   ├── layouts/        # Page layout wrappers (e.g., AuthLayout)
│   └── ui/             # Atomic/Primitive UI components (Button, Input)
├── lib/                # Shared utilities and configurations (API client, helpers)
├── pages/              # Page components grouped by feature
│   └── auth/           # Authentication pages (Login, Register)
├── store/              # Global state management
│   ├── api/            # RTK Query API definitions (Request/Response contracts)
│   ├── slices/         # Redux Slices (Local state management)
│   └── index.ts        # Store configuration
├── types/              # Global TypeScript interfaces and type definitions
├── app.tsx             # Main application component & Routing
└── main.tsx            # Entry point
```

## 🛠 Tech Stack

- **Core:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)


## ⚙️ Common Commands

In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode.  
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`
Builds the app for production to the `dist` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run lint`
Runs ESLint to find and fix problems in your codebase.

### `npm run preview`
Locally preview the production build.

## 🔑 Key Features

- **Advanced Auth Flow:** Secure JWT handling with interceptors for token expiration, automatic token refresh, and persistent sessions.
- **Strict Typing:** Full TypeScript integration for end-to-end type safety between the API layer and the UI.
- **Modern UI:** Built with a "dark-mode first" aesthetic using glassmorphism and subtle animations.
- **Modular Design:** Clear separation between "Form Values" (UI data) and "API Requests" (Backend data) to maintain clean architectural boundaries.
