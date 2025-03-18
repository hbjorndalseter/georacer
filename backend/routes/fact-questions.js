import express from 'express';
import prisma from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const fact_questions = await prisma.factQuestion.findMany();
        res.json(fact_questions);
    } catch (error) {
        console.error("Feil ved henting av spillere:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
});

// Get a fact question by mapId
router.get('/:mapId', async (req, res) => {
    try {
        const fact_questions = await prisma.factQuestion.findMany({
            where: {
                cityMapId: parseInt(req.params.mapId)
            }
        });
        res.json(fact_questions);
    } catch (error) {
        console.error("Feil ved henting av spillere:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
});

export default router;