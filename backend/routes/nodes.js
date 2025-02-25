import express from 'express';
import prisma from '../db.js';

const router = express.Router();

router.get('/:cityMapId', async (req, res) => {
    try {
        const nodes = await prisma.node.findMany({
            where: {
                cityMapId: parseInt(req.params.cityMapId)
            }
        });
        console.log("Nodes:", nodes)
        res.json(nodes);
    } catch (error) {
        console.error("Feil ved henting av noder:", error);
        res.status(500).json({ error: 'Noe jævlig gikk galt' });
    }
}
);

export default router;