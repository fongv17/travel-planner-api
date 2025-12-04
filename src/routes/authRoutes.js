import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Admin-only signup route for creating additional admins
router.post("/admin/signup", protect, authorizeRoles("ADMIN"), signup);

export default router;
