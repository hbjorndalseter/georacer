import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// Hente alle spillere
router.get('/', async (req, res) => {
    try {
        const players = await prisma.players.findMany();
        res.json(players);
    } catch (error) {
        console.error("Feil ved henting av spillere:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
});

// Legge til en ny spiller
router.post('/', async (req, res) => {
    try {
        const { name, speed } = req.body;
        const newPlayer = await prisma.players.create({
            data: { name, speed }
        });
        res.status(201).json(newPlayer);
    } catch (error) {
        console.error("Feil ved opprettelse av spiller:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
});

export default router;