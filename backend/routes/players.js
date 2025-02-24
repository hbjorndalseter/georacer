import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const players = await pool.query('SELECT * FROM players');
        res.json(players.rows);
    } catch (error) {
        console.error(error.message);
    }
});

export default router;