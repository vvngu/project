import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./api/auth.js";
import eventRoutes from "./api/events.js";
import rsvpRoutes from "./api/rsvps.js";
import requireAuth from "../middleware/requireAuth.js";

const app = express();
const prisma = new PrismaClient();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Adjust this based on your frontend domain

// Serve the homepage
app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to Get2Gether!</h1>
    <p>Get together with friends and plan events!</p>
    <p><a href="/auth/register">Register</a></p>
    <p><a href="/auth/login">Login</a></p>
  `);
});

// Ping endpoint for API health check
app.get('/ping', (req, res) => {
  res.status(200).send({ message: 'pong' });
});

// Use routes
app.use("/auth", authRoutes);
app.use("/events", eventRoutes);
app.use("/rsvp", rsvpRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});