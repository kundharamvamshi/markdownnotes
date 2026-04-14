const sqlite3 = require('better-sqlite3');
const { open } = require('sqlite');

const dbPromise = open({
    filename: 'notes.db',
    driver: sqlite3.Database
});

(async () => {
    const db = await dbPromise;

    await db.prepare(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )
    `);
}).run();

module.exports = dbPromise;