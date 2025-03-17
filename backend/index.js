import dotenv from 'dotenv';
dotenv.config();
console.log("🚀 DATABASE_URL:", process.env.DATABASE_URL);

import express from 'express';
import cors from 'cors';
import prisma from './db.js';
import playerRouter from './routes/players.js';
import questionCoordinatesRouter from './routes/questions-coordinates.js';
import spacialQuestionRouter from './routes/spacial-questions.js';
import factQuestionRouter from './routes/fact-questions.js';
import riddleQuestionRouter from './routes/riddle-questions.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

app.use('/api/players', playerRouter);
app.use('/api/questions-coordinates', questionCoordinatesRouter);
app.use('/api/spacial-questions', spacialQuestionRouter);
app.use('/api/fact-questions', factQuestionRouter);
app.use('/api/riddle-questions', riddleQuestionRouter);

app.get('/', (req, res) => {
    res.send({msg: 'Backend fungerer!'});
});

// Test databaseforbindelse ved oppstart
async function testDbConnection() {
    try {
        const result = await prisma.$queryRaw`SELECT NOW();`;
        console.log('Connected to database:', result[0]);
    } catch (error) {
        console.error('Database connection error:', error);
    }
}
testDbConnection();

app.listen(port, () => {
    console.log(`Server kjører på http://localhost:${port}`);
});