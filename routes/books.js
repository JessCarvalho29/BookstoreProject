const express = require("express");
const router = express.Router();
const Book = require("../models/book");

const { ensureAuthenticated } = require("../middleware/auth");

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let books;

    if (searchQuery) {
      books = await Book.find({
        $or: [
          { title: new RegExp(searchQuery, "i") },
          { author: new RegExp(searchQuery, "i") },
        ],
      }).lean();
    } else {
      books = await Book.find().lean();
    }

    res.render("books/index", {
      books: books,
      bookCount: books.length,
      searchTerm: searchQuery,
      hasBooks: books.length > 0,
      title: "Cozy Chapters Corner - Manage Your Bookstore"
    });
  } catch (err) {
    res.status(500).send("Error retrieving books");
  }
});

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("books/book-form", {
    title: "Add New Book",
    formTitle: "Add New Book",
    submitText: "Add Book",
    action: "/books/add",
  });
});

router.post("/add", ensureAuthenticated, async (req, res) => {
  try {
    const newBook = new Book(req.body);
    newBook.title = newBook.title.trim();
    newBook.author = newBook.author.trim();
    newBook.price = parseFloat(newBook.price);
    newBook.coverUrl =
      newBook.coverUrl?.trim() ||
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300";
    newBook.description = newBook.description ? newBook.description.trim() : "";
    newBook.dateAdded = new Date().toISOString();

    await newBook.save();
    res.redirect("/books");
  } catch (err) {
    res.status(500).send("Error adding book");
  }
});

router.get("/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean();
    if (!book) {
      return res.redirect("/");
    }

    res.render("books/book-form", {
      title: "Edit Book",
      formTitle: "Edit Book",
      submitText: "Update Book",
      action: `/books/edit/${book._id}`,
      book: book,
      isEdit: true,
    });
  } catch (err) {
    res.status(500).send("Error loading book to edit");
  }
});

router.post("/edit/:id", ensureAuthenticated, async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body).lean();
    res.redirect("/books");
  } catch (err) {
    res.status(500).send("Error editing book");
  }
});

router.post("/delete/:id", ensureAuthenticated, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id).lean();
    res.redirect("/books");
  } catch (err) {
    res.status(500).send("Error deleting book");
  }
});

module.exports = router;
