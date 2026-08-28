export const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS libraries (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    folder_path TEXT    NOT NULL UNIQUE,
    name        TEXT    NOT NULL,
    date_added  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS comics (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    file_path    TEXT    NOT NULL UNIQUE,
    title        TEXT    NOT NULL,
    series       TEXT,
    volume       INTEGER,
    issue_number INTEGER,
    format       TEXT    NOT NULL CHECK (format IN ('cbz','cbr','pdf','epub')),
    page_count   INTEGER NOT NULL DEFAULT 0,
    cover_path   TEXT,
    status       TEXT    NOT NULL DEFAULT 'unread'
                         CHECK (status IN ('unread','reading','read')),
    current_page INTEGER NOT NULL DEFAULT 0,
    date_added   TEXT    NOT NULL DEFAULT (datetime('now')),
    last_read_at TEXT
  );

  CREATE TABLE IF NOT EXISTS shelves (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     TEXT    NOT NULL,
    position INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS shelf_items (
    shelf_id INTEGER NOT NULL REFERENCES shelves(id) ON DELETE CASCADE,
    comic_id INTEGER NOT NULL REFERENCES comics(id)  ON DELETE CASCADE,
    position INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (shelf_id, comic_id)
  );

  CREATE INDEX IF NOT EXISTS idx_comics_status    ON comics (status);
  CREATE INDEX IF NOT EXISTS idx_comics_series    ON comics (series);
  CREATE INDEX IF NOT EXISTS idx_comics_file_path ON comics (file_path);
`
