const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        product_id: {
            type: Schema.Types.ObjectId, ref: 'Product'
        },
        order_date: {
            
        }
    }