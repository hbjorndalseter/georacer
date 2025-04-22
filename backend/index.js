import dotenv from 'dotenv';
dotenv.config();
console.log("DATABASE_URL:", process.env.DATABASE_URL);

import express from 'express';
import cors from 'cors';
import prisma from './db.js';
import playerRouter from './routes/players.js';
import factQuestionRouter from './routes/fact-questions.js';
import roadnetRouter from './routes/roadnet.js';
import cityMapRouter from './routes/city-maps.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

app.use('/api/players', playerRouter);
app.use('/api/fact-questions', factQuestionRouter);
app.use('/api/roadnet', roadnetRouter);
app.use('/api/city-maps', cityMapRouter);
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter);

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