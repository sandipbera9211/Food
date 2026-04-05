# 🍔 DineDrop – Food Ordering App

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://food-frontend-w9f1.onrender.com/)
[![Repository](https://img.shields.io/badge/GitHub-Repo-blue)](https://github.com/sandipbera9211/Food)

**DineDrop** is a modern, full-stack food ordering platform designed for a seamless user experience. It includes a user-facing application for browsing and ordering food, and an admin dashboard for managing the menu and orders.

---



## 🚀 Features

### **User App**
- **Dynamic Menu:** Browse dishes by categories with a smooth, responsive UI.
- **Cart Management:** Add, remove, and manage items in your cart with real-time totals.
- **Secure Checkout:** Integration for placing orders (Stripe support available).
- **Authentication:** JWT-based user login and registration for protected routes.
- **Order Tracking:** View order history and status.

### **Admin Panel**
- **Dashboard:** Overview of food items and orders.
- **Food Management:** Add new dishes, upload images, and manage existing menu items.
- **Order Processing:** Update order status from pending to delivered.

---

## 🛠️ Tech Stack

- **Frontend:** React, Vite, React Router, Tailwind CSS, Swiper
- **Backend:** Node.js, Express, MongoDB (Mongoose), Multer, JWT, Bcrypt
- **Admin:** React, Vite, React Router, Tailwind CSS
- **Storage:** Local static serving / Cloudinary support

---

## 📂 Project Structure

```bash
Food/
├── Frontend/      # User-facing application (React + Vite)
├── Backend/       # API and server logic (Express + MongoDB)
├── admin/         # Admin dashboard (React + Vite)
└── font.png       # Design assets
```

---

## ⚙️ Getting Started (Local Development)

### **Prerequisites**
- **Node.js 18+** installed.
- **MongoDB** (Atlas or local instance).

### **1. Clone the Repository**
```bash
git clone https://github.com/sandipbera9211/Food.git
cd Food
```

### **2. Backend Setup**
1. Navigate to the backend folder:
   ```bash
   cd Backend
   npm install
   ```
2. Create a `.env` file and add the following:
   ```env
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   STRIPE_SECRET_KEY=<optional-stripe-key>
   CLOUDINARY_CLOUD_NAME=<optional-cloudinary-name>
   CLOUDINARY_API_KEY=<optional-cloudinary-key>
   CLOUDINARY_API_SECRET=<optional-cloudinary-secret>
   ```
3. Start the server:
   ```bash
   npm run server
   ```
   *Runs on `http://localhost:4000`*

### **3. Frontend Setup**
1. Navigate to the frontend folder:
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```
   *Runs on `http://localhost:5173`*

### **4. Admin Panel Setup**
1. Navigate to the admin folder:
   ```bash
   cd ../admin
   npm install
   npm run dev
   ```
   *Runs on the printed local URL.*

---

## 🌐 Deployment

- **Live Site:** [DineDrop Frontend](https://food-frontend-w9f1.onrender.com/)
- The backend is typically deployed to Render or similar platforms. Ensure environment variables are configured correctly on the hosting provider.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Built with ❤️ by [Sandip Bera](https://github.com/sandipbera9211)*
