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

export default router;