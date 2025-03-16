import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// Get all nodes in a given city map
router.get('/:cityMapId/nodes', async (req, res) => {
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
        res.status(500).json({ error: 'Noe forferdelig gikk galt' });
    }
}
);

// Get the start node of a given city map
router.get('/:cityMapId/startnode', async (req, res) => {
    try {
        const startNode = await prisma.node.findFirst({
            where: {
                cityMapId: parseInt(req.params.cityMapId),
                id: 1
            }
        });
        console.log("Startnode:", startNode)
        res.json(startNode);
    } catch (error) {
        console.error("Feil ved henting av startnode:", error);
        res.status(500).json({ error: 'Noe forferdelig gikk galt' });
    }
});

// Get neighbours of a given node in a given city map
router.get('/:cityMapId/:nodeId/neighbours', async (req, res) => {
    try {
        const { cityMapId, nodeId } = req.params;

        // Convert params to integers
        const cityMapIdInt = parseInt(cityMapId);
        const nodeIdInt = parseInt(nodeId);

        if (isNaN(cityMapIdInt) || isNaN(nodeIdInt)) {
            return res.status(400).json({ error: "Invalid cityMapId or nodeId" });
        }

        // Fetch neighbours from both connections1 and connections2
        const edges = await prisma.edge.findMany({
            where: {
                cityMapId: cityMapIdInt,
                OR: [{ node1Id: nodeIdInt }, { node2Id: nodeIdInt }]
            },
            include: {
                node1: true,
                node2: true
            }
        });

        // Extract neighbour nodes
        const neighbours = edges.map(edge =>
            edge.node1Id === nodeIdInt ? edge.node2 : edge.node1
        );

        res.json(neighbours);
    } catch (error) {
        console.error("Error fetching neighbors:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

export default router;