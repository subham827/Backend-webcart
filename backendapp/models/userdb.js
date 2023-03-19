const mongoose = require('mongoose');

const UserCarts = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            }
        }

    },
    name: {
        type: String,
        required: true
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
