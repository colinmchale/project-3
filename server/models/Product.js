const { Schema, model } = require('mongoose');

const imageArray = ['spin.jpg', 'cookie-tin.jpg', 'camera.jpg', 'bike.jpg'];

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
        default: imageArray[Math.floor(Math.random()*4)],
    },
    date_created: {
        type: Date,
        default: Date.now
        // Make sure the date is not being returned as UTC with some giant number
    },
    expiration_time: {
        type: Date,
        default: new Date(Date.now() + 1000*60*60*5)
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
    category: {
        type: Schema.Types.ObjectId, 
        ref: 'Category'
    }
});

const Product = model('Product', productSchema);

module.exports = Product;