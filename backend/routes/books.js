const express = require('express');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

const router = express.Router();

// 🔐 Toutes les routes sont protégées
router.use(auth);

// ▶️ CREATE a book (POST /api/books)
router.post('/', async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = new Book({ title, author, description, publishedYear, userId: req.user.userId });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📥 READ all books for logged-in user (GET /api/books)
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.userId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📘 READ one book by ID (GET /api/books/:id)
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!book) return res.status(404).json({ message: 'Livre introuvable' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ UPDATE a book (PUT /api/books/:id)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Livre non trouvé ou non autorisé' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ❌ DELETE a book (DELETE /api/books/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!deleted) return res.status(404).json({ message: 'Livre non trouvé ou non autorisé' });
    res.json({ message: 'Livre supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
