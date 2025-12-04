import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { signToken } from "../utils/jwt.js";

const prisma = new PrismaClient();

/**
 * POST /auth/signup
 * body: { name, email, password, role? }
 */
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, and password are required" });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Determine the role for the new user
    let userRole = "USER"; // default role

    if (role === "ADMIN") {
      // Check if there are any existing admin users
      const adminCount = await prisma.user.count({
        where: { role: "ADMIN" }
      });

      // Allow admin role if:
      // 1. Request comes from an authenticated admin, OR
      // 2. No admin users exist yet (first admin creation)
      if (req.user && req.user.role === "ADMIN") {
        userRole = "ADMIN";
      } else if (adminCount === 0) {
        userRole = "ADMIN"; // Allow first admin creation
      } else {
        return res.status(403).json({
          message: "Admin role can only be assigned by existing admins"
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    const token = signToken(user);

    return res.status(201).json({ user, token });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * POST /auth/login
 * body: { email, password }
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    const token = signToken(safeUser);

    return res.status(200).json({ user: safeUser, token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
