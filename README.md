<img width="1510" height="317" alt="image" src="https://github.com/user-attachments/assets/71b980cc-536a-4480-8b57-cac61811024c" />

# 🌟 GlowCart

**GlowCart** is a modern, visually appealing e-commerce platform focused on beauty and cosmetics. Built with **React**, the project provides a smooth shopping experience with features like favorites, filtering, sorting, and a responsive UI. GlowCart emphasizes an elegant and feminine design using vibrant tones like hot pink (`#ff0099`) and lavender (`#b266ff`).

🔗 **Live Demo:** [https://glow-cart-sevderks-projects.vercel.app](https://glow-cart-sevderks-projects.vercel.app)

---

## ✨ Features

- 🛍️ **Product Listings** with filter & sort options
- 💖 **Favorites system** (like/wishlist)
- 🛒 **Shopping Cart** with quantity & stock control
- 🔍 **Search functionality**
- 👤 **Login/Signup/Profile Pages**
- 📱 **Fully responsive** design
- 🎨 **Modern UI/UX** with banners, sliders, and animated navigation
- ❤️ Designed with custom color palette (GlowCart Style)

---

## 📁 Folder Structure

src/
- assets/ # Static images (icons, banners, logo)
- components/ # Reusable UI components
- constants/ # Color palette and global constants
- models/ # API calls and data fetch logic
- utils/ # Filter/sort helpers
- viewmodels/ # State management logic (favorites)
- views/ # Page components (Home, Cart, etc.)
- App.jsx # Main app and routing
- index.css # Tailwind + custom styles


---

## 🛠️ Technologies Used

- **React 19** with functional components and hooks
- **Vite** for fast development server and optimized build tool
- **React Router DOM** for navigation
- **Axios** for fetching JSON data from GitHub repository
- **TailwindCSS** for styling
- **React Icons** for iconography
- **JavaScript**
- **Vercel** for hosting & CI/CD 
- *(Optional in future: Redux for global state)*

---

## 🔑 Environment Notes
No dedicated backend — product data is stored in a JSON file within the GitHub repository and fetched via Axios.

No authentication logic — login, signup, and profile are currently UI-only.

---

## 📌 To Do / Planned Features
- 🧠 Redux integration for global state (cart, favorites)

- 🛒 Checkout flow

- 🌐 Internationalization (i18n)

- 🔐 Backend integration with real user auth

- 📱 Mobile-first improvements

---

## 🙋‍♀️ Author
Made with 💖 by [@sevderk](https://github.com/sevderk)

---

## 📦 Installation

```bash
git clone https://github.com/sevderk/GlowCart.git
cd GlowCart
npm install
npm install axios
npm run dev
```

#### ⚠️ Requirements
- Node.js (v16+ recommended): https://nodejs.org
- Git: https://git-scm.com

#### 🌐 View in Browser
- After running npm run dev, open your browser and go to:
- http://localhost:5173
- Or check the terminal output for the exact port (might vary).

#### 📝 Notes
- This project uses Vite for development.
- If npm run dev doesn't work, try:

```bash 
npm install vite --save-dev
```
