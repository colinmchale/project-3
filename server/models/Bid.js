const { Schema, model } = require('mongoose');

const bidSchema = new Schema(
    {
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    product_id: {
        type: Schema.Types.ObjectId, ref: 'Product'
    }
    }
    )

    module.exports = Bid;