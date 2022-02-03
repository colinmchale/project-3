const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        buyer_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        seller_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        product_id: {
            type: Schema.Types.ObjectId, 
            ref: 'Product',
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
