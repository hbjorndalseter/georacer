import express from "express";
import prisma from "../db.js";

const router = express.Router();

router.delete('/players/:cityMapId', async (req, res) => {
    const { cityMapId } = req.params;
  
    try {
      await prisma.player.deleteMany({
        where: { cityMapId: parseInt(cityMapId) }, // tilpass hvis string
      });
  
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: "Failed to delete players" });
    }
  });

export default router;