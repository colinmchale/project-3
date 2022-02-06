const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        product: {
            type: Schema.Types.ObjectId, 
            ref: 'Product',
            unique: true
        },
        order_date: {
            type: Date,
            default: Date.now
        },
        price: {
            type: Number
        }
    }
)

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
