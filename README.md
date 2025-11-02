# ⚡ NextStarter – Complete Next.js Starter Template (Next.js + ShadCN + React Hook Form + State Management)

A production-ready, fully responsive **Next.js starter template** built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **ShadCN/UI**, **React Hook Form**, and **state management integration** (via Zustand or Redux).  

This project is designed as a **“go-to boilerplate”** for developers who want to skip repetitive setup and start building immediately with clean, scalable foundations — including **authentication UI**, **state management**, and **modern component structure**.

---

## 🚀 Features

✅ **Next.js App Router** – Modern file-based routing  
✅ **ShadCN/UI components** – Polished, accessible UI toolkit  
✅ **React Hook Form** – Simplified and performant form handling  
✅ **Global State Management** – Integrated store setup (Zustand/Redux ready)  
✅ **Lucide Icons** – Lightweight icon library for modern UIs  
✅ **Sonner Toasts** – Instant visual feedback for user actions  
✅ **Responsive Layout** – Optimized for all devices  
✅ **Dummy Authentication Logic** – Works without a backend  
✅ **Easy Customization** – Plug in your APIs, replace logic, and scale  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Framework | [Next.js 14+ (App Router)](https://nextjs.org/docs/app) |
| Language | TypeScript |
| UI Library | [ShadCN/UI](https://ui.shadcn.com) |
| Styling | Tailwind CSS |
| Forms | [React Hook Form](https://react-hook-form.com) |
| Icons | Lucide React |
| Notifications | Sonner |
| State Management | Zustand / Redux (modular setup) |

---

## 🧠 Overview

**NextStarter** is your one-stop boilerplate to kickstart new **Next.js projects** instantly.  
No repetitive setup. No clutter. Just clone, install, and start building.

Built for:
- Developers who frequently start new Next.js projects  
- Teams that want a consistent base architecture  
- Rapid prototyping with authentication UIs and state handling  
- Clean, modular, and scalable codebases  

Includes:
- **Login & Signup forms (dummy-ready)**  
- **Client-side validation & error handling**  
- **Toasts for visual feedback**  
- **Global store for user state**  
- **Fully responsive layouts**

---

## 🧰 Folder Structure

```

src/
│
├── app/
│   ├── page.tsx                 # Root page
│   └── auth/
│       └── page.tsx             # Authentication page (Login + Signup)
│
├── components/
│   └── ui/                      # ShadCN reusable UI components
│
├── lib/
│   ├── store/                   # State management setup (Zustand or Redux)
│   └── api/                     # Optional backend/API layer
│
└── styles/
└── globals.css

````

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/nextstarter-template.git
cd nextstarter-template
````

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

### 4️⃣ Visit in your browser

[http://localhost:3000](http://localhost:3000)

---

## 🧱 Core Components

### `AuthPage`

* Handles **Login** and **Signup** tab switching
* Uses **React Hook Form** for form validation
* Includes **password visibility toggle**
* Triggers **Sonner toasts** for dummy success/failure messages

### `useStore` (Global State)

* Handles global user/session state
* Easy to extend with app-wide context or preferences

---

## 🔐 Integrating Real Authentication

To connect real APIs:

1. Replace dummy handlers (`onLogin`, `onSignup`) with API calls (Axios, TanStack Query, etc.)
2. Store JWT/user data in cookies or localStorage
3. Redirect authenticated users using Next.js router
4. Update toast messages with server responses

Example (using React Query):

```ts
const loginMutation = useMutation({
  mutationFn: (data) => api.post("/auth/login", data),
  onSuccess: () => router.push("/dashboard"),
})
```

---

## ⚙️ Customization Guide

| Goal                | File / Folder                                   |
| ------------------- | ----------------------------------------------- |
| Change brand name   | `/app/auth/page.tsx` header                     |
| Update theme        | `tailwind.config.js` or ShadCN theme config     |
| Modify forms        | Inside `SignupFormInputs` and `LoginFormInputs` |
| Add state logic     | `/lib/store/` folder                            |
| Add API integration | `/lib/api/` folder                              |

---

## 🧪 Example UI (Login vs Signup)

| Login                                  | Signup                                   |
| -------------------------------------- | ---------------------------------------- |
| ![Login Screenshot](docs/login-ui.png) | ![Signup Screenshot](docs/signup-ui.png) |

---

## 🧑‍🎨 Design Principles

* Minimal, developer-first UI
* Component consistency & accessibility
* Maintainable code structure
* Mobile-first responsiveness
* Scalable architecture

---

## 🧭 Roadmap

* [ ] Add OAuth providers (Google, GitHub)
* [ ] Add forgot password & remember-me options
* [ ] Integrate backend authentication (JWT/session)
* [ ] Extend store with profile & theme state
* [ ] Add dashboard example

---

## 🧾 License

**MIT License** — Free to use, modify, and distribute with attribution.

---

## 💡 Author

**Saim Malik**
Full-Stack Developer | MERN & Next.js Engineer
💼 [LinkedIn](https://www.linkedin.com/in/msaimmalik/)
🌐 [Portfolio](https://saim-portfolio.vercel.app/)

