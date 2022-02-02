const { Schema, model } = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    // Mongo automatically gives each model an ID right? Or should I include it here?
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
        // Make sure the date is not being returned as UTC with some giant number
    },
    expiration_time: {
        type: Date,
        default: Date.now + 7
    },
    starting_price: {
        type: Number,
        required: true,
        min: 0.01
    },
    current_price: {
        type: Number,
        min: 0.01
    },
    bid: {
        type: Schema.Types.ObjectId, 
        ref: 'Bid'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;