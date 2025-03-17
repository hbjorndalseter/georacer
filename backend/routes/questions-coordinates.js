import express from 'express';
import prisma from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const coordinates = await prisma.coordinate.findMany();
        res.json(coordinates);
    } catch (error) {
        console.error("Feil ved henting av spillere:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
});

export default router;