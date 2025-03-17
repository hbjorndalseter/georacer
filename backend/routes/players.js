import express from 'express';
import prisma from '../db.js';

const router = express.Router();

const getOrCreatePlayer = async (name) => {
    // Prøv å finn spilleren med gitt navn
    let player = await prisma.player.findUnique({
        where: { name },
        include: {
            completedFactQuestions: true,
            completedRiddleQuestions: true,
            completedSpacialQuestions: true,
        }
    });
    
    let isNewPlayer = false;

    if(!player) {
        // Opprett ny spiller
        player = await prisma.player.create({
            data: { name, score: 0 },
            include: {
                completedFactQuestions: true,
                completedRiddleQuestions: true,
                completedSpacialQuestions: true,
            }
        });
        isNewPlayer = true;
    }
   
    return { player, isNewPlayer };
};

// Hente alle spillere
router.get('/', async (req, res) => {
    try {
        const players = await prisma.player.findMany();
        res.json(players);
    } catch (error) {
        console.error("Feil ved henting av spillere:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
});

//Hent en spiller på navn
router.get('/:name', async (req, res) => {
    const { name } = req.params;

    try {
        const player = await prisma.player.findUnique({
            where: { name },
            include: {
                completedFactQuestions: true,
                completedRiddleQuestions: true,
                completedSpacialQuestions: true,
            }
        });
        res.json(player);
    } catch (error) {
        console.error("Feil ved henting av spiller:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
});


// Endpoint to update a player's completed question
router.post('/:name/completed-question', async (req, res) => {
    const { name } = req.params;
    const { questionId, questionType } = req.body;

    if (!questionId || !questionType) {
        return res.status(400).json({ error: 'questionId and questionType are required' });
    }

    let updateData = {};
    if (questionType === 'fact') {
        updateData = { completedFactQuestions: { connect: { id: questionId } } };
    } else if (questionType === 'riddle') {
        updateData = { completedRiddleQuestions: { connect: { id: questionId } } };
    } else if (questionType === 'spacial') {
        updateData = { completedSpacialQuestions: { connect: { id: questionId } } };
    } else {
        return res.status(400).json({ error: 'Invalid question type' });
    }

    try {
        const updatedPlayer = await prisma.player.update({
            where: { name },
            data: updateData,
            include: {
                completedFactQuestions: true,
                completedRiddleQuestions: true,
                completedSpacialQuestions: true,
            }
        });
        res.json(updatedPlayer);
    } catch (error) {
        console.error("Error updating completed question for player:", error);
        res.status(500).json({ error: 'Noe gikk galt' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.player.delete({
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

//Login eller lag ny spiller
router.post('/login', async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Navn må oppgis' });
    }
    try {
        const {player, isNewPlayer} = await getOrCreatePlayer(name);
        res.json({player, isNewPlayer});
    } catch (error) {
        console.error("Feil ved opprettelse av spiller:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;