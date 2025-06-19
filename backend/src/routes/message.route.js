import express from 'express';
const router = express.Router();
import {getUserForSidebar} from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';

// Add debugging middleware
router.use((req, res, next) => {
  console.log(`\n=== MESSAGE ROUTE DEBUG ===`);
  console.log(`Method: ${req.method}`);
  console.log(`Original URL: ${req.originalUrl}`);
  console.log(`Path: ${req.path}`);
  console.log(`Params:`, req.params);
  console.log(`========================\n`);
  next();
});

router.get("/users", protectRoute, getUserForSidebar);
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, sendMessage);

export default router;