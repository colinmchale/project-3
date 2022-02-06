const mongoose = require('mongoose');

const { Schema } = mongoose;

const bidSchema = new Schema(
    {
    price: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    seller: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId, 
        ref: 'Product'
    },
    }
);

const Bid = mongoose.model('Bid', bidSchema);


module.exports = Bid;