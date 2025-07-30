import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // ✅ Read from cookie OR Authorization header
    let token = req.cookies.jwt;

    // ✅ Fallback: check Bearer token in Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ❌ If still no token, reject
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    // ✅ Decode and verify
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token Format" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("❌ Error in protectRoute middleware:", error.message);
    res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};
