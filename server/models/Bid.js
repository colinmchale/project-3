const mongoose = require('mongoose');

const { Schema } = mongoose;

const bidSchema = new Schema(
    {
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    product_id: {
        type: Schema.Types.ObjectId, ref: 'Product'
    }
    }
);

const Bid = mongoose.model('Bid', bidSchema);


module.exports = Bid;