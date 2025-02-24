import dotenv from 'dotenv';
dotenv.config({path : './backend/.env'});

import express from 'express';
import cors from 'cors';
import pkg from 'pg';

const { Client } = pkg;

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json()); 

// Vet ikke hva de to neste linjene gjør

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

client.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Error connecting to database', err.stack));

app.get('/', (req, res) => {
    res.send({msg: 'Backend fungerer!'});
});

app.listen(port, () => {
    console.log(`Server kjører på http://localhost:${port}`);
});