# 💬 LiveChat - Real-Time Chat Application

LiveChat is a full-stack real-time chat application built using the MERN stack. It enables users to register, log in, and engage in live conversations with others instantly.


👉 Explore the project live: https://gleeful-lolly-1c6012.netlify.app/

(Hosted on Netlify — responsive and mobile-friendly!)

## 🚀 Features

- 🔒 User Authentication (Register/Login)
- 💬 Real-Time Messaging with Socket.io
- 📁 Image Upload via Cloudinary
- 🧠 Backend API built with Express & MongoDB
- ⚡ Frontend built using React + Vite
- 🎯 Responsive and clean UI

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.io
- Cloudinary (Image Upload)

---

## 🧑‍💻 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/LiveChat.git
cd LiveChat

cd backend
npm install

PORT=5000
MONGODB_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

npm run dev

cd ../frontend/vite-project
npm install
npm run dev

Folder Structure:
LiveChat
├── backend
│   ├── src
│   ├── controllers, models, routes, etc.
├── frontend
│   ├── vite-project
│   ├── public, components, pages

🙌 Contributing
Fork the repo

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
MIT License © 2025 [Divyansh]



