const express = require('express');
const Book = require('../models/book-model');
const router = express.Router();

let books = [];

router.get('/', async(req,res)=>{
    const response = await Book.find({});
    res.render("books", {data: response});
});

router.get('/add-book', (req,res)=>{
    res.render("add-book");
});

router.get('/edit/:id', (req,res)=>{
    const bookId = req.params.id;
    const book = books.find((book) => book.id === bookId);
    res.render('edit-book', { book });
});

router.get('/delete/:id', (req,res)=>{
    const bookId = req.params.id;
    const book = books.find((book) => book.id === bookId);
    res.render('delete-book', { book });
});

router.get('/search', (req, res) => {
    res.render('search-book');
  });

router.post('/search', (req,res)=>{
    const searchTerm = req.body.searchTerm;
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  res.render('books', { books: filteredBooks });
});

router.post('/add-book', async(req,res) => {
    const bookData = req.body;
    books.push(bookData);
    res.redirect('/');
})

router.post('/edit/:id', (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;
    books = books.map((book) => {
      if (book.id === bookId) {
        return { ...book, ...updatedBookData };
      }
      return book;
    });
    res.redirect('/books');
  });

  router.post('/delete/:id', (req, res) => {
    const bookId = req.params.id;
    books = books.filter((book) => book.id !== bookId);
    res.redirect('/books');
  });

module.exports = router;