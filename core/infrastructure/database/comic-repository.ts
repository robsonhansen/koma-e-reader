// core/infrastructure/database/comic-repository.ts
import type Database from 'better-sqlite3'
import type { Comic, CreateComicInput, ReadingStatus } from '../../domain/comic'

interface ComicRow {
  id: number
  file_path: string
  title: string
  series: string | null
  volume: number | null
  issue_number: number | null
  format: string
  page_count: number
  cover_path: string | null
  status: string
  current_page: number
  date_added: string
  last_read_at: string | null
}

function rowToComic(row: ComicRow): Comic {
  return {
    id: row.id,
    filePath: row.file_path,
    title: row.title,
    series: row.series,
    volume: row.volume,
    issueNumber: row.issue_number,
    format: row.format as Comic['format'],
    pageCount: row.page_count,
    coverPath: row.cover_path,
    status: row.status as Comic['status'],
    currentPage: row.current_page,
    dateAdded: row.date_added,
    lastReadAt: row.last_read_at
  }
}

export class ComicRepository {
  constructor(private db: Database.Database) {}

  findAll(): Comic[] {
    const rows = this.db
      .prepare('SELECT * FROM comics ORDER BY date_added DESC')
      .all() as ComicRow[]
    return rows.map(rowToComic)
  }

  findById(id: number): Comic | null {
    const row = this.db.prepare('SELECT * FROM comics WHERE id = ?').get(id) as ComicRow | undefined
    return row ? rowToComic(row) : null
  }

  findByFilePath(filePath: string): Comic | null {
    const row = this.db.prepare('SELECT * FROM comics WHERE file_path = ?').get(filePath) as
      ComicRow | undefined
    return row ? rowToComic(row) : null
  }

  create(input: CreateComicInput): Comic {
    const result = this.db
      .prepare(
        `
      INSERT INTO comics
        (file_path, title, series, volume, issue_number, format,
         page_count, cover_path, status, current_page, last_read_at)
      VALUES
        (@filePath, @title, @series, @volume, @issueNumber, @format,
         @pageCount, @coverPath, @status, @currentPage, @lastReadAt)
    `
      )
      .run(input)

    return this.findById(result.lastInsertRowid as number)!
  }

  updateStatus(id: number, status: ReadingStatus): void {
    this.db.prepare('UPDATE comics SET status = ? WHERE id = ?').run(status, id)
  }

  updateProgress(id: number, currentPage: number): void {
    this.db
      .prepare(
        `
      UPDATE comics SET
        current_page = ?,
        last_read_at = datetime('now'),
        status = CASE WHEN status = 'unread' THEN 'reading' ELSE status END
      WHERE id = ?
    `
      )
      .run(currentPage, id)
  }

  delete(id: number): void {
    this.db.prepare('DELETE FROM comics WHERE id = ?').run(id)
  }
}
