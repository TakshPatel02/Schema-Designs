# Food Delivery Schema (Mongoose)

This module defines MongoDB schemas for a food delivery platform using Mongoose.

## File

- Schema.js: Contains all schema definitions and model declarations.

## Models

### 1. User

Represents all platform users, including customers, restaurant owners, delivery personnel, and admins.

Fields:

- full_name (String, required)
- email (String, required, unique)
- phone_number (String, required, unique)
- user_type (String enum, required)
- address (String, optional)
- timestamps enabled

Allowed user_type enum values:

- customer
- restaurant_owner
- delivery_person
- admin

### 2. Restaurant

Stores restaurant profile and operating status.

Fields:

- name (String, required)
- address (String, required)
- status (String enum, required)
- timestamps enabled

Allowed status enum values:

- open
- closed

### 3. MenuItem

Defines menu items listed by a restaurant.

Fields:

- name (String, required)
- price (Number, required)
- category (String, required)
- availability_status (String enum, required)
- restaurant_id (ObjectId ref Restaurant, required)
- timestamps enabled

Allowed availability_status enum values:

- available
- unavailable

### 4. OrderStatusField

Captures milestone timestamps for order lifecycle events.

Fields:

- placed_at (Date, default Date.now)
- accepted_at (Date, optional)
- preparing_at (Date, optional)
- out_for_delivery_at (Date, optional)
- delivered_at (Date, optional)
- cancelled_at (Date, optional)
- timestamps enabled

### 5. Order

Represents a customer order placed at a restaurant.

Fields:

- customer_id (ObjectId ref User, required)
- restaurant_id (ObjectId ref Restaurant, required)
- status (String enum, required)
- status_field_id (ObjectId ref OrderStatusField, required)
- payment_method (String enum, required)
- delivery_instructions (String, optional)
- timestamps enabled

Allowed status enum values:

- pending
- accepted
- preparing
- out_for_delivery
- delivered
- cancelled

Allowed payment_method enum values:

- credit_card
- debit_card
- paypal
- cash_on_delivery

### 6. OrderItem

Stores line items belonging to an order.

Fields:

- order_id (ObjectId ref Order, required)
- menu_item_id (ObjectId ref MenuItem, required)
- quantity (Number, required)
- price (Number, required)
- timestamps enabled

### 7. DeliveryAssignment

Tracks assignment and fulfillment of an order by a delivery agent.

Fields:

- order_id (ObjectId ref Order, required)
- delivery_agent_id (ObjectId ref User, required)
- status (String enum, required)
- assigned_at (Date, default Date.now)
- picked_up_at (Date, optional)
- delivered_at (Date, optional)
- timestamps enabled

Allowed status enum values:

- assigned
- picked_up
- delivered

## Relationship Summary

- MenuItem belongs to one Restaurant via restaurant_id.
- Order links one customer (User) and one Restaurant.
- Order references one OrderStatusField for lifecycle timestamps.
- OrderItem belongs to one Order and one MenuItem.
- DeliveryAssignment links one Order with one delivery agent (User).

## Diagram

The schema diagram is also included.