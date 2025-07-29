
// import jwt from "jsonwebtoken";

// export const generateToken = (userId, res) => {
//   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: true,            // Always true for Render (uses HTTPS)
//     sameSite: "",        // ✅ Allows cross-origin cookies
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   return token;
// };
// utils/generateToken.js
import jwt from "jsonwebtoken";

// Standard token generation for cookie-based auth
export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,             // ✅ Required for HTTPS (production like Render)
    sameSite: "None",         // ✅ Required for cross-origin (e.g. Netlify <-> Render)
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token; // if needed elsewhere
};

// Alternative: for mobile fallback (cookie + token in body)
export const generateTokenWithFallback = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    token,
    cookieSet: true,
  };
};
