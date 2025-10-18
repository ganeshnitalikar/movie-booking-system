# 🎬 Movie Booking App

A modern and responsive **movie booking platform** built using **React**, **Redux Toolkit**, **Material UI (MUI)**, and **Tailwind CSS**.  
The goal of this project is to develop a full-featured booking system with role-based access for **users**, **owners**, and **admins**, following a modular and scalable architecture.

---

## 🚀 Tech Stack

**Frontend**
- React 19
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Material UI (MUI)
- Emotion (for styled components)
- React Toastify

**Build Tools**
- Vite
- Tailwind + MUI integration
- Git for version control

---

## 🏗️ Project Structure

```
src/
├── assets/              # Static files (images, icons, etc.)
├── components/
│   ├── booking/         # Booking related components
│   ├── common/          # Shared UI components
│   ├── dashboard/       # Dashboard views (Admin/Owner)
│   ├── layout/          # Layout components (Navbar, Sidebar, Footer)
│   └── movie/           # Movie-related UI components
├── constants/           # App-wide constants and configuration
├── context/             # React Context API (global state)
├── hooks/               # Custom hooks
├── public/
│   ├── adminPages/      # Admin-specific pages
│   ├── ownerPages/      # Theater Owner pages
│   ├── public/          # Public-facing pages
│   └── userPages/       # User dashboard and booking pages
├── redux/
│   └── slices/          # Redux slices for state management
├── routes/              # App routing setup
├── services/            # API services and backend communication
└── utils/               # Utility/helper functions
```

---

## 📦 Dependencies Installed

```json
"@emotion/react": "^11.14.0",
"@emotion/styled": "^11.14.1",
"@mui/material": "^7.3.4",
"@reduxjs/toolkit": "^2.9.1",
"@tailwindcss/vite": "^4.1.14",
"react": "^19.1.1",
"react-dom": "^19.1.1",
"react-redux": "^9.2.0",
"react-router-dom": "^7.9.4",
"react-toastify": "^11.0.5",
"tailwindcss": "^4.1.14"
```

---

## 🗓️ Development Progress

### 🧱 Initial Commit
- Initialized empty project repository.
- Added `.gitignore` and `README.md` files.

### 🏁 First Commit
- Created complete **project structure** for modular scalability.
- Installed all major dependencies listed above.
- Integrated **Tailwind CSS** and **MUI** for hybrid styling support.
- Added folder hierarchy for role-based routes (public, user, owner, admin).

### 🌙 Second Commit
- Implemented **Theme Toggle functionality** using React Context Provider.
- Created a global **ThemeContext** to manage light and dark modes.
- Integrated theme toggle across the app with MUI theme provider and Tailwind classes.
- Ensured theme state persists between sessions for consistent user experience.


### third commit
- Configured **Redux store** for state management.
- Created **authSlice** inside `src/redux/slices` for managing authentication state.
- Integrated the store with the main app entry point.
- Added basic authentication reducers and actions for login, logout, and user persistence.


---


---

## 🧰 Scripts

| Command | Description |
|----------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Run app in development mode |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |

---

## 📸 Screenshots (Coming Soon)
Screenshots and UI previews will be added once the initial UI components are developed.

---

## 👨‍💻 Author

**Ganesh Nitalikar**  
Frontend & Full Stack Developer (React / Flutter / MERN)  
📍 Pune, India  

[GitHub](https://github.com/) • [LinkedIn](https://linkedin.com/in/)

---

## 🪪 License

This project is licensed under the **MIT License** — feel free to use and modify it for learning or portfolio purposes.
