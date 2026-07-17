import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

const useSsl = String(process.env.DATABASE_SSL).toLowerCase() === 'true'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: useSsl ? { rejectUnauthorized: false } : false,
})

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL client error', err)
})

export async function query(text, params) {
  return pool.query(text, params)
}
