const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

const dbPromise = open({
    filename: 'notes.db',
    driver: sqlite3.Database
});

(async () => {
    const db = await dbPromise;

    await db.exec(`
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )
    `);
})();

module.exports = dbPromise;