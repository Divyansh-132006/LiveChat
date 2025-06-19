// import express from "express";
// import dotenv from "dotenv";
// import { connectDB } from "./lib/db.js"; 
// import cors from "cors";
// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import cookieParser from "cookie-parser";
// import {app, server} from "./lib/socket.js"; // Importing the socket setup

// dotenv.config();


// const PORT = process.env.PORT

// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/auth", authRoutes)
// app.use("/api/message", messageRoutes)
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

// server.listen(PORT,()=>{
//     console.log("server is running on PORT:" + PORT);
//     connectDB()
// });
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://live-chat-ijl7.vercel.app"
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/vite-project/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/vite-project/dist", "index.html"));
  });
}


server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});