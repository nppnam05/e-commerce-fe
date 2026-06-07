# E-Commerce Frontend

A modern, high-performance e-commerce frontend built with React 19, Vite, and Redux Toolkit.
Focused on clean architecture, premium UI/UX, and robust state management.

## 🎯 Features

- **Authentication**
  - JWT token handling with automatic refresh
  - Google OAuth2 login
  - Silent refresh and auto-login on app launch
  - HttpOnly Cookies (XSS protection)

- **State Management**
  - Redux Toolkit for global UI state
  - RTK Query for API data fetching & caching
  - Modular slice architecture

- **UI/UX**
  - Dark-mode first with glassmorphism design
  - Responsive layout (mobile, tablet, desktop)
  - Smooth animations and transitions

- **Type Safety**
  - Full TypeScript integration
  - End-to-end type safety (API ↔ UI)

## 🛠️ Tech Stack

- **Core:** React 19
- **Build Tool:** Vite
- **State Management:** Redux Toolkit + RTK Query
- **Styling:** Tailwind CSS v4
- **Routing:** React Router 7
- **Form Handling:** React Hook Form
- **Language:** TypeScript

## 📂 Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable components
│   ├── layouts/    # Page layout wrappers
│   └── ui/         # Atomic UI components
├── lib/            # API client, helpers, configs
├── pages/          # Feature-based page components
│   ├── auth/       # Login, Register
│   ├── products/   # Product listing, details
│   └── checkout/   # Cart, Orders
├── store/          # Redux store
│   ├── api/        # RTK Query API definitions
│   ├── slices/     # Redux slices
│   └── index.ts    # Store setup
├── types/          # Global TypeScript types
├── app.tsx         # Main App & routing
└── main.tsx        # Entry point
```

## 📋 Prerequisites

- Node.js v18+
- Backend API running (see [e-commerce-be](https://github.com/nppnam05/e-commerce-be))

## 🚀 Getting Started

1. **Clone & Install**
```bash
git clone https://github.com/nppnam05/e-commerce-fe.git
cd e-commerce-fe
npm install
```

2. **Start Development Server**
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

## ⚙️ Available Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
```

## 🏗️ Architecture Highlights

**Authentication Flow:**
1. User logs in → Backend returns JWT tokens stored in HttpOnly Cookies
2. Access token expires → Silent refresh automatically
3. App launch → Check valid session, auto-login if exists
4. Logout → Revoke session on backend

**State Management Pattern:**
- Redux Slices → Local UI state (loading, filters, modals)
- RTK Query → Server state (products, orders, user data)

## 🚢 Deployment

```bash
npm run build
docker build -t e-commerce-fe:latest .
docker run -p 3000:80 e-commerce-fe:latest
```

**Live Demo:** http://nam23211.id.vn:3000

## 🔗 Related Projects

- [Backend API](https://github.com/nppnam05/e-commerce-be)
- [Database Schema](https://github.com/nppnam05/e-commerce-database)

## 👨‍💻 Author

**Nguyen Pham Phuong Nam**
- GitHub: [@nppnam05](https://github.com/nppnam05)
- Email: nppnam05@gmail.com