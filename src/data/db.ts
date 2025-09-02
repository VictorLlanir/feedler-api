import { Database } from "sqlite3";

const sqlite3 = require('sqlite3').verbose();

const db: Database = new sqlite3.Database('./db.sqlite', (err: any) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.serialize(() => {
      db.run("CREATE TABLE IF NOT EXISTS feeds (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT, created_at TEXT, updated_at TEXT)");
    });
  }
});

export default db;