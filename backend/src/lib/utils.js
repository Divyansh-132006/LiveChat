
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

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,             // ✅ Only use secure cookies in production (Render)
    sameSite: isProduction ? "None" : "Lax",  // ✅ Required for cross-origin auth
    maxAge: 7 * 24 * 60 * 60 * 1000,  // ✅ 7 days in milliseconds
  });

  return token; // optional, if you want to use it in the response too
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
