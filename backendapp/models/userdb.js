const mongoose = require('mongoose');

const UserCarts = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    }
   
},
{
    collection: 'user-cart'
}
);


const model = mongoose.model('UserCart', UserCarts);
module.exports = model;
