import express from "express";
import { signup, login, adminsignup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/adminsignup", adminsignup)

export default router;
