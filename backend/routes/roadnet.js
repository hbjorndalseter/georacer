import express from 'express';
import prisma from '../db.js';

const router = express.Router();

// Get all nodes in a given city map
router.get('/:cityMapId/nodes', async (req, res) => {
    console.log("Hentet ut nodene")
    try {
        const nodes = await prisma.node.findMany({
            where: {
                cityMapId: parseInt(req.params.cityMapId)
            }
        });
        res.json(nodes);
    } catch (error) {
        console.error("Feil ved henting av noder:", error);
        res.status(500).json({ error: 'Noe forferdelig gikk galt 1' });
    }
}
);

// Get a map of all the edges in the graph
router.get('/:cityMapId/edges', async (req, res) => {
    const cityMapId = parseInt(req.params.cityMapId);
    if (isNaN(cityMapId)) {
      return res.status(400).json({ error: "Invalid cityMapId" });
    }
  
    try {
      const edges = await prisma.edge.findMany({
        where: { cityMapId },
        include: { node1: true, node2: true }
      });
  
      const edgeMap = {};
  
      edges.forEach(({ node1Id, node2Id, node1, node2 }) => {
        if (!node1 || !node2) return;
  
        [ [node1Id, node2], [node2Id, node1] ].forEach(([fromId, toNode]) => {
          edgeMap[fromId] ??= [];
          edgeMap[fromId].push({
            id: toNode.id,
            lat: toNode.lat,
            lng: toNode.lng
          });
        });
      });
  
      res.json(edgeMap);
    } catch (error) {
      console.error("Error in /edges:", error);
      res.status(500).json({ error: "Internal server error", message: error.message });
    }
  });
  

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
        res.status(500).json({ error: 'Noe forferdelig gikk galt 2' });
    }
});

// Get a specific node in a given city map
router.get('/:cityMapId/:nodeId', async (req, res) => {
    try {
        const node = await prisma.node.findFirst({
            where: {
                cityMapId: parseInt(req.params.cityMapId),
                id: parseInt(req.params.nodeId)
            }
        });
        console.log("Node:", node)
        res.json(node);
    } catch (error) {
        console.error("Feil ved henting av node:", error);
        res.status(500).json({ error: 'Noe forferdelig gikk galt 3' });
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