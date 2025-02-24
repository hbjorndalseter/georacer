import dotenv from 'dotenv';
import pool from './db.js';
import express from 'express';
import cors from 'cors';
import playerRouter from './routes/players.js';

dotenv.config({path : './backend/.env'});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

app.use('/api/players', playerRouter);

app.get('/', (req, res) => {
    res.send({msg: 'Backend fungerer!'});
});

// Test databaseforbindelse ved oppstart
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection error', err);
    } else {
        console.log('Connected to database:', res.rows[0].now);
    }
});

app.listen(port, () => {
    console.log(`Server kjører på http://localhost:${port}`);
});