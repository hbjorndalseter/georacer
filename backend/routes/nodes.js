import express from 'express';
import prisma from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const nodes = await prisma.Node.findMany();
        res.json(nodes);
    } catch (error) {
        console.error("Feil ved henting av noder:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
}
);

export default router;