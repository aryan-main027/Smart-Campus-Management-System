import pkg from "pg";
import dotenv from "dotenv"

dotenv.config();

// in pg package Pool helps us to reuse connection that is once setup without pool for every request we need to connect again which make system slower ans inefficient 

const { Pool } = pkg;

const pool = new Pool({
  connectionString : process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export default pool;