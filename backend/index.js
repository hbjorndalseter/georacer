import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import prisma from './db.js';
import playerRouter from './routes/players.js';
import nodeRouter from './routes/nodes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

app.use('/api/players', playerRouter);
app.use('/api/nodes', nodeRouter);

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