import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);  

const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

console.log(`Leter etter .env i: ${envPath}`);
console.log(`Verifiserer etter dotenv.config: ${process.env.DATABASE_URL ? "URL funnet!" : "URL fortsatt ikke funnet!"}`);

import express from 'express';
import cors from 'cors';
import prisma from './db.js';
import playerRouter from './routes/players.js';
import spacialQuestionRouter from './routes/spacial-questions.js';
import factQuestionRouter from './routes/fact-questions.js';
import riddleQuestionRouter from './routes/riddle-questions.js';
import roadnetRouter from './routes/roadnet.js';
import cityMapRouter from './routes/city-maps.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js'

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://tba4250s03.it.ntnu.no', // frontend-url
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }));

app.options('*', cors());

app.use(express.json()); 

app.use((req, res, next) => {
    // Log alle innkommende forespørsler
    console.log(`--> Request Received: ${req.method} ${req.originalUrl}`);
    next(); // Send forespørselen videre til neste middleware/rute
  });

app.use('/api/players', playerRouter);
app.use('/api/spacial-questions', spacialQuestionRouter);
app.use('/api/fact-questions', factQuestionRouter);
app.use('/api/riddle-questions', riddleQuestionRouter);
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

app.listen(port, '0.0.0.0', () => {
    console.log(`Server kjører på ${port}`);
});
