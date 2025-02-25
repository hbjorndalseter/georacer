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
    const { name } = req.body;

    console.log("Mottatt data fra frontend:", req.body); // For debugging

    if (!name) {
        return res.status(400).json({ error: 'Navn må oppgis' });
    }
    try {
        const newPlayer = await prisma.players.create({
            data: { name }
        });
        res.json(newPlayer);
    } catch (error) {
        console.error("Feil ved opprettelse av spiller:", error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.players.delete({
            where: { id: parseInt(id) }
        });

        // Tilbakestill ID-sekvensen
        await prisma.$executeRawUnsafe(`
            SELECT setval('players_id_seq', COALESCE((SELECT MAX(id) FROM "Players"), 1), false);
        `);

        res.json({ message: "Spiller slettet" });
    } catch (error) {
        console.error("Feil ved sletting av spiller:", error);
        res.status(500).json({ error: "Noe gikk galt" });
    }
});

export default router;