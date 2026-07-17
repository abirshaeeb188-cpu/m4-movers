import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'
import { pool } from '../config/db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function run() {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
  console.log('Running schema.sql ...')
  await pool.query(schema)
  console.log('Schema is up to date.')

  const adminEmail = process.env.ADMIN_SEED_EMAIL
  const adminPassword = process.env.ADMIN_SEED_PASSWORD
  const adminName = process.env.ADMIN_SEED_NAME || 'M4 Movers Admin'

  if (adminEmail && adminPassword) {
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [adminEmail])
    if (existing.rowCount === 0) {
      const hash = await bcrypt.hash(adminPassword, 10)
      await pool.query(
        `INSERT INTO users (full_name, email, phone, password_hash, role, is_verified, status)
         VALUES ($1, $2, $3, $4, 'admin', TRUE, 'active')`,
        [adminName, adminEmail, '+971500000000', hash]
      )
      console.log(`Seeded admin account: ${adminEmail}`)
    } else {
      console.log(`Admin account already exists: ${adminEmail}`)
    }
  } else {
    console.log('ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD not set — skipping admin seed.')
  }

  await pool.end()
  console.log('Done.')
}

run().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
