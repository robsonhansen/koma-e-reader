import Database from 'better-sqlite3'
import path from 'path'
import { SCHEMA_SQL } from './schema'

let db: Database.Database | null = null

export function getDatabase(userDataPath: string): Database.Database {
  if (db) return db

  const dbPath = path.join(userDataPath, 'koma.db')
  db = new Database(dbPath)

  // WAL: melhor performance para leituras simultâneas
  db.pragma('journal_mode = WAL')
  // Garante integridade referencial entre tabelas
  db.pragma('foreign_keys = ON')

  db.exec(SCHEMA_SQL)

  return db
}

export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
}
