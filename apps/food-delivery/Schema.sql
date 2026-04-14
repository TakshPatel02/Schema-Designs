-- SQLite database export
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "phone_number" TEXT NOT NULL UNIQUE,
    "type" TEXT NOT NULL DEFAULT 'Customer',
    "address" TEXT,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS "order" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "user_id" INTEGER NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "status_field_id" INTEGER NOT NULL,
    "payment_method" TEXT NOT NULL,
    "delivery_instruction" TEXT,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    FOREIGN KEY("id") REFERENCES "delivery_assignments"("order_id"),
    FOREIGN KEY("status_field_id") REFERENCES "order_status"("id"),
    FOREIGN KEY("restaurant_id") REFERENCES "restaurants"("id"),
    FOREIGN KEY("user_id") REFERENCES "User"("id")
);


CREATE TABLE IF NOT EXISTS "order_items" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "order_id" INTEGER NOT NULL,
    "menu_item_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_at_purchase" REAL NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    FOREIGN KEY("menu_item_id") REFERENCES "menu_items"("id"),
    FOREIGN KEY("order_id") REFERENCES "order"("id")
);


CREATE TABLE IF NOT EXISTS "restaurants" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL
);


CREATE TABLE IF NOT EXISTS "menu_items" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category" TEXT NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "resturant_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    FOREIGN KEY("resturant_id") REFERENCES "restaurants"("id")
);


CREATE TABLE IF NOT EXISTS "delivery_assignments" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "order_id" INTEGER NOT NULL,
    "delivery_agent_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "assigned_at" TIMESTAMP NOT NULL,
    "pickup_at" TIMESTAMP,
    "dropped_at" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP NOT NULL,
    FOREIGN KEY("delivery_agent_id") REFERENCES "User"("id")
);


CREATE TABLE IF NOT EXISTS "order_status" (
    "id" INTEGER PRIMARY KEY NOT NULL,
    "placed_at" TIMESTAMP NOT NULL,
    "accepted_at" TIMESTAMP,
    "prepared_at" TIMESTAMP,
    "out_of_delivered_at" TIMESTAMP,
    "delivered_at" TIMESTAMP,
    "canceled_at" TIMESTAMP
);


COMMIT;
