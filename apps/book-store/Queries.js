import { Author, AuthorBook, Book, Borrower, Borrowing } from './Schema.js';

// Get all books written by a given author (author_id)

const getBooksByAuthor = async (author_id) => {
    const books = await AuthorBook.find({ author_id }).populate('book_id');
    return books.map(ab => ab.book_id);
};

// List all authors for a given book (book_id)
const getAuthorsByBook = async (book_id) => {
    const authors = await AuthorBook.find({ book_id }).populate('author_id');
    return authors.map(ab => ab.author_id);
};

// Count how many books a borrower has borrowed this year (borrower_id)
const countBorrowedBooksThisYear = async (borrower_id) => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);
    const endOfYear = new Date(new Date().getFullYear(), 11, 31);

    const count = await Borrowing.countDocuments({
        borrower_id,
        status: 'borrowed',
        createdAt: { $gte: startOfYear, $lte: endOfYear }
    });

    return count;
};

// Get all books that are currently borrowed (status = 'borrowed')
const getCurrentlyBorrowedBooks = async () => {
    const borrowings = await Borrowing.find({ status: 'borrowed' }).populate('book_id');
    return borrowings.map(b => b.book_id);
};