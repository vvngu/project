import express from 'express';
import { PrismaClient } from '@prisma/client';
import requireAuth from "../../middleware/requireAuth.js";

const prisma = new PrismaClient();
const router = express.Router();

// RSVP to an event
router.post("/events/:id/rsvp", requireAuth, async (req, res) => {
  const eventId = parseInt(req.params.id);
  const userId = req.userId;
  const { status } = req.body;

  const rsvp = await prisma.rsvp.create({
    data: {
      eventId,
      userId,
      status,
    },
  });

  res.status(201).json(rsvp);
});

// Get all RSVPs for an event
router.get("/events/:id/rsvps", async (req, res) => {
  const eventId = parseInt(req.params.id);

  const rsvps = await prisma.rsvp.findMany({
    where: { eventId },
  });

  res.json(rsvps);
});

// Update RSVP status
router.put("/:id", requireAuth, async (req, res) => {
  const rsvpId = parseInt(req.params.id);
  const { status } = req.body;

  const rsvp = await prisma.rsvp.update({
    where: { id: rsvpId },
    data: { status },
  });

  res.json(rsvp);
});

// Remove RSVP
router.delete("/:id", requireAuth, async (req, res) => {
  const rsvpId = parseInt(req.params.id);

  await prisma.rsvp.delete({
    where: { id: rsvpId },
  });

  res.status(204).send();
});

export default router;