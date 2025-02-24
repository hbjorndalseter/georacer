import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './backend/.env' });

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('DATABASE_URL er ikke satt. Sjekk .env-filen.');
    process.exit(1);
}

const pool = new Pool({
    connectionString: connectionString,
    password: process.env.DB_PASSWORD || 'admin' // 🔹 Setter passord eksplisitt
});

export default pool;