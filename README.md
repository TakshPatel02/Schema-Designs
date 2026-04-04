# Schema Design Workspace

This repository contains database schema design practice apps.

## Workspace Structure

- apps/book-store: Mongoose schemas for a bookstore and borrowing system.
- apps/food-delivery: Mongoose schemas for a food delivery platform.

## Current Focus

The Book Store app includes schema definitions for:

- Book
- Author
- AuthorBook (many-to-many relation)
- Borrower
- Borrowing (with enum status)

The Food Delivery app includes schema definitions for:

- User (customer, restaurant owner, delivery person, admin)
- Restaurant
- MenuItem
- OrderStatusField (lifecycle timestamps)
- Order
- OrderItem
- DeliveryAssignment

## Tech Stack

- Node.js
- MongoDB
- Mongoose
