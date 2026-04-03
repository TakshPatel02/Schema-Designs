import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    isbn_no: {
        type: String,
        required: true,
        unique: true,
    },
    publication_year: {
        type: Number,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Book = model('Book', bookSchema);

const authorSchema = new Schema({
    full_name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const Author = model('Author', authorSchema);

const authorBookSchema = new Schema({
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    book_id: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    }
}, { timestamps: true });

const AuthorBook = model('AuthorBook', authorBookSchema);

const BorrowerSchema = new Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const Borrower = model('Borrower', BorrowerSchema);

const BorrowingSchema = new Schema({
    borrower_id:{
        type: Schema.Types.ObjectId,
        ref: 'Borrower',
        required: true,
    },
    book_id:{
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    status:{
        enum: ['borrowed', 'returned', 'overdue'],
        type: String,
        default: 'borrowed',
        required: true,
    },
    due_date:{
        type: Date,
        required: true,
    }
}, {timestamps: true});

const Borrowing = model('Borrowing', BorrowingSchema);

export { Book, Author, AuthorBook, Borrower, Borrowing };