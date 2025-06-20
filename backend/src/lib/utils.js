
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

export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Check if we're in production
  const isProduction = process.env.NODE_ENV === "production";
  
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction, // Only secure in production
    sameSite: isProduction ? "None" : "Lax", // Use Lax for development, None for production
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // Add domain for production if needed
    ...(isProduction && { 
      domain: process.env.COOKIE_DOMAIN || undefined 
    })
  });

  return token;
};

// Alternative approach - also send token in response body for mobile fallback
export const generateTokenWithFallback = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";
  
  // Set cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Also return token in response for mobile fallback
  return {
    token,
    cookieSet: true
  };
};