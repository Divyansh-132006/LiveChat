
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";


const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "https://gleeful-lolly-1c6012.netlify.app",
  "http://localhost:5173", // for local dev
];




app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/vite-project/dist")));

  app.all('/*splat', (req, res) => {
  res.status(404).send(`The URL ${req.originalUrl} doesn't exist`);
});

}


server.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});
