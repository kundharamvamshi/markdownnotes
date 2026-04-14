const express = require('express');
const router = express.Router();

const db = require('../db'); 


router.get('/', (req, res) => {
    try {
        const allNotes = db.prepare('SELECT * FROM notes').all(); // ✅ call function
        res.json(allNotes);
    } catch (error) {
        console.error(`Error fetching notes: ${error.message}`);
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
});


router.post('/', (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title or content cannot be empty' });
    }

    try {
        db.prepare('INSERT INTO notes (title, content) VALUES (?, ?)').run(title, content);
        res.json({ message: 'Note created successfully' });
    } catch (error) {
        console.error(`Error creating note: ${error.message}`);
        res.status(500).json({ error: 'Failed to create note' });
    }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title or content cannot be empty' });
    }

    try {
        const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }

        db.prepare('UPDATE notes SET title = ?, content = ? WHERE id = ?')
          .run(title, content, id);

        res.json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error(`Error updating note: ${error.message}`);
        res.status(500).json({ error: 'Failed to update note' });
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;

    try {
        const note = db.prepare('SELECT * FROM notes WHERE id = ?').get(id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        db.prepare('DELETE FROM notes WHERE id = ?').run(id);

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(`Error deleting note: ${error.message}`);
        res.status(500).json({ error: 'Failed to delete note' });
    }
});

module.exports = router;