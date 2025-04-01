import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import requireAuth from "../../middleware/requireAuth.js";

const prisma = new PrismaClient();
const router = express.Router();

// Register endpoint
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password, //hashedPassword,
    },
  });

  res.status(201).json({ message: "User created successfully" });
});

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // const isMatch = await bcrypt.compare(password, user.password);
  //if (!isMatch)

  if (password !== user.password){
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, "your_secret_key", { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true }).status(200).json({ message: "Logged in successfully" });
});

// Logout endpoint
router.post("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logged out successfully" });
});

export default router;