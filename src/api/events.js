import express from "express";
import { PrismaClient } from "@prisma/client";
import requireAuth from "../../middleware/requireAuth.js";


const router = express.Router();
const prisma = new PrismaClient();

// Get all events
router.get("/", async (req, res) => {
  const events = await prisma.event.findMany();
  res.json(events);
});

// Create new event
router.post("/", requireAuth, async (req, res) => {
  const { title, description, date, location } = req.body;
  const userId = req.userId; // From requireAuth middleware

  const event = await prisma.event.create({
    data: {
      title,
      description,
      date,
      location,
      createdBy: userId,
    },
  });

  res.status(201).json(event);
});

// Get event details by ID
router.get("/:id", async (req, res) => {
  const event = await prisma.event.findUnique({
    where: { id: parseInt(req.params.id) },
  });

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  res.json(event);
});

// Update event
router.put("/:id", requireAuth, async (req, res) => {
  const { title, description, date, location } = req.body;
  const eventId = parseInt(req.params.id);
  const userId = req.userId;

  const event = await prisma.event.findUnique({ where: { id: eventId } });

  if (!event || event.createdBy !== userId) {
    return res.status(404).json({ message: "Event not found or unauthorized" });
  }

  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: { title, description, date, location },
  });

  res.json(updatedEvent);
});

// Delete event
router.delete("/:id", requireAuth, async (req, res) => {
  const eventId = parseInt(req.params.id);
  const userId = req.userId;

  const event = await prisma.event.findUnique({ where: { id: eventId } });

  if (!event || event.createdBy !== userId) {
    return res.status(404).json({ message: "Event not found or unauthorized" });
  }

  await prisma.event.delete({ where: { id: eventId } });

  res.status(204).send();
});

export default router;