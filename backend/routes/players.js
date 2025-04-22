import express from 'express';
import prisma from '../db.js';

const router = express.Router();

const getOrCreatePlayer = async (name, cityMapId) => {
  const trimmedName = name.trim();
  console.log("🔍 Sjekker spiller:", trimmedName, "for by:", cityMapId);

  const player = await prisma.player.findFirst({
    where: {
      cityMapId,
      name: {
        equals: trimmedName,
        mode: "insensitive", // 👈 burde treffe på 'Hjalmar' og 'hjalmar'
      },
    },
  });

  console.log("🧾 Fant spiller:", player);

  if (!player) {
    const newPlayer = await prisma.player.create({
      data: { name: trimmedName, score: 0, cityMapId },
    });
    console.log("✨ Opprettet ny spiller:", newPlayer);
    return { player: newPlayer, isNewPlayer: true };
  }

  return { player, isNewPlayer: false };
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
        });
        res.json(player);
    } catch (error) {
        console.error("Feil ved henting av spiller:", error);
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
  const { name, cityMapId } = req.body;

  if (!name || !cityMapId) {
    return res.status(400).json({ error: 'Navn og cityMapId må oppgis' });
  }

  try {
    const { player, isNewPlayer } = await getOrCreatePlayer(name, cityMapId);
    res.json({ player, alreadyExists: !isNewPlayer }); 
  } catch (error) {
    console.error("Feil ved opprettelse av spiller:", error);
    res.status(500).json({ error: error.message });
  }
});

router.post('/update-score', async (req, res) => {
    const { name, score, cityMapId } = req.body;
  
    if (!name || !score || !cityMapId) {
      return res.status(400).json({ error: 'Navn, score og cityMapId må oppgis' });
    }
  
    try {
      const player = await prisma.player.update({
        where: {
          name_cityMapId: {
            name,
            cityMapId: Number(cityMapId),
          },
        },
        data: { score },
      });
  
      res.json(player);
    } catch (error) {
      console.error("Feil ved oppdatering av score:", error);
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/top-players-by-map/:cityMapId", async (req, res) => {
    const { cityMapId } = req.params;
  
    const idNum = Number(cityMapId);
    if (isNaN(idNum)) {
      return res.status(400).json({ error: "Ugyldig cityMapId" });
    }
  
    try {
      const players = await prisma.player.findMany({
        where: { cityMapId: idNum },
        orderBy: { score: "desc" },
        take: 10,
      });
  
      res.json(players);
    } catch (error) {
      console.error("Feil ved henting av toppspillere:", error);
      res.status(500).json({ error: "Noe gikk galt ved henting av spillere" });
    }
  });

export default router;