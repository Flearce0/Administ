import { Database } from 'bun:sqlite'
import { readFileSync } from 'fs'

const db = new Database('database/tasks.db')

const schema_file = readFileSync('database/db_schema.sql', 'utf8')
db.run(schema_file)

export default db