# Book Store Schema (Mongoose)

This module defines MongoDB schemas for a simple bookstore management system using Mongoose.

## File

- Schema.js: Contains all schema definitions and model exports.

## Models

### 1. Book

Fields:

- title (String, required)
- isbn_no (String, required, unique)
- publication_year (Number, required)
- genre (String, required)
- timestamps enabled

### 2. Author

Fields:

- full_name (String, required)
- country (String, required)
- date_of_birth (Date, required)
- email (String, required, unique)
- phone_number (String, required, unique)
- timestamps enabled

### 3. AuthorBook

Junction/bridge model for many-to-many relation between Author and Book.

Fields:

- author_id (ObjectId ref Author, required)
- book_id (ObjectId ref Book, required)
- timestamps enabled

### 4. Borrower

Fields:

- full_name (String, required)
- email (String, required, unique)
- phone_number (String, required, unique)
- timestamps enabled

### 5. Borrowing

Tracks borrowing transactions.

Fields:

- borrower_id (ObjectId ref Borrower, required)
- book_id (ObjectId ref Book, required)
- status (String enum, required, default borrowed)
- due_date (Date, required)
- timestamps enabled

Allowed status enum values:

- borrowed
- returned
- overdue

## Exported Models

The following models are exported from Schema.js:

- Book
- Author
- AuthorBook
- Borrower
- Borrowing

## Example: Create Borrowing Record

```js
import { Borrowing } from "./Schema.js";

await Borrowing.create({
  borrower_id: "660000000000000000000001",
  book_id: "660000000000000000000002",
  status: "borrowed",
  due_date: new Date("2026-05-01"),
});
```

If status is not provided, it defaults to borrowed.
