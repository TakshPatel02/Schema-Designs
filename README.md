# Schema Design Workspace

This repository contains database schema design practice apps.

## Workspace Structure

- apps/book-store: Mongoose schemas for a bookstore and borrowing system.
- apps/food-delivery: Mongoose schemas for a food delivery platform.
- apps/SaaS-project-management-system: Mongoose schemas for a team-based project management system.

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
- Review (customer feedback and ratings)

The SaaS Project Management app includes schema definitions for:

- User
- Team
- TeamMember
- Project
- Task
- TaskAssignees
- Comment
- ActivityLog
- Invitation

## Tech Stack

- Node.js
- MongoDB
- Mongoose
