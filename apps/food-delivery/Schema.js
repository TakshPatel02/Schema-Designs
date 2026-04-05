import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true,
        unique: true
    },
    user_type: {
        enum: ['customer', 'restaurant_owner', 'delivery_person', 'admin'],
        type: String,
        required: true
    },
    address: {
        type: String,
    },
}, { timestamps: true });

const User = model('User', userSchema);

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        enum: ['open', 'closed'],
        type: String,
        required: true
    },
}, { timestamps: true });

const Restaurant = model('Restaurant', restaurantSchema);

const menuItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    availability_status: {
        enum: ['available', 'unavailable'],
        type: String,
        required: true
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    }
}, { timestamps: true });

const MenuItem = model('MenuItem', menuItemSchema);

const orderStatusFieldSchema = new Schema({
    placed_at: {
        type: Date,
        default: Date.now
    },
    accepted_at: {
        type: Date
    },
    preparing_at: {
        type: Date
    },
    out_for_delivery_at: {
        type: Date
    },
    delivered_at: {
        type: Date
    },
    cancelled_at: {
        type: Date
    }
}, { timestamps: true });

const OrderStatusField = model('OrderStatusField', orderStatusFieldSchema);

const orderSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    status: {
        enum: ['pending', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
        type: String,
        required: true
    },
    status_field_id: {
        type: Schema.Types.ObjectId,
        ref: 'OrderStatusField',
        required: true
    },
    payment_method: {
        enum: ['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'],
        type: String,
        required: true
    },
    delivery_instructions: {
        type: String
    },
}, { timestamps: true });

const Order = model('Order', orderSchema);

const orderItemSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    menu_item_id: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const OrderItem = model('OrderItem', orderItemSchema);

const deliveryAssignmentSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    delivery_agent_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        enum: ['assigned', 'picked_up', 'delivered'],
        type: String,
        required: true
    },
    assigned_at: {
        type: Date,
        default: Date.now
    },
    picked_up_at: {
        type: Date
    },
    delivered_at: {
        type: Date
    },
}, { timestamps: true });

const DeliveryAssignment = model('DeliveryAssignment', deliveryAssignmentSchema);

const reviewSchema = new Schema({
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant_id: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String
    }
}, { timestamps: true });

const Review = model('Review', reviewSchema);