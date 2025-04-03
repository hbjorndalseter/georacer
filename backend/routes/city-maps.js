import express from "express";
import prisma from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cityMaps = await prisma.cityMap.findMany();
        res.json(cityMaps);
    } catch (error) {
        console.error("Feil ved henting av bykart:", error);
        res.status(500).json({ error: "Noe gikk galt ved henting av bykart." });
    }
});

router.get("/:cityMapId", async (req, res) => {
    const cityMapId = Number(req.params.cityMapId); // 🔥 viktig linje!
  
    if (isNaN(cityMapId)) {
      return res.status(400).json({ error: "cityMapId må være et tall" });
    }
  
    try {
      const cityMap = await prisma.cityMap.findUnique({
        where: { id: cityMapId }, // nå et tall ✅
      });
  
      if (!cityMap) {
        return res.status(404).json({ error: "Fant ikke kart" });
      }
  
      res.json(cityMap.name); // eller hele objektet hvis du ønsker det
    } catch (error) {
      console.error("Feil ved henting av bynavn:", error);
      res.status(500).json({ error: "Noe gikk galt" });
    }
  });

export default router;