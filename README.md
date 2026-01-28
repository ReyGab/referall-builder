# Vite + React + Redux Template

A modern frontend template using **Vite**, **React 19**, **Redux Toolkit**, **TypeScript**, **MUI**, and **Formik**. This project also includes tools for linting, formatting, testing, and a mock JSON server.

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- ⚡ Fast development with **Vite**
- 🛠 State management with **Redux Toolkit**
- 🎨 UI components with **MUI** and **Emotion**
- ✅ Form handling with **Formik**
- 🧪 Testing with **Vitest** and **React Testing Library**
- 🧹 Code quality with **ESLint** and **Prettier**
- 🗂 Mock backend using **json-server**
- 📝 Fully typed with **TypeScript**

---

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/ReyGab/referall-builder.git
cd vite-template-redux

2. **Install dependencies**

npm install
# or
yarn install

3. **Start the development server**

npm run dev
# or
yarn dev

Frontend: http://localhost:5173

JSON Server: http://localhost:9092



Project Structure 📂

vite-template-redux/
├─ public/             # Static assets
├─ src/
│  ├─ components/      # React components
│  ├─ features/        # Redux slices
│  ├─ hooks/           # Custom hooks
│  ├─ pages/           # Page components
│  ├─ services/        # API or utilities
│  ├─ App.tsx          # Main app component
│  └─ main.tsx         # Entry point
├─ data/
│  └─ db.json          # Mock JSON data
├─ package.json
├─ tsconfig.json
└─ vite.config.ts


Dependencies 📦

    React & React DOM

    Redux Toolkit & React Redux

    MUI & Emotion

    Formik

    UUID

    JSON Server (for mock backend)

Dev Dependencies:

    Vite

    TypeScript

    ESLint & Prettier

    Vitest & Testing Library

    jsdom