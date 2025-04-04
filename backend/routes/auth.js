import express from 'express';
//import prisma from '../db.js';

const router = express.Router();

router.post('/verify-admin', (req, res) => {
  const { password } = req.body;

  if (!password) return res.status(400).json({ error: "Password required" });

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;