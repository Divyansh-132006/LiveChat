
import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,            // Always true for Render (uses HTTPS)
    sameSite: "None",        // ✅ Allows cross-origin cookies
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
