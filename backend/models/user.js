const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = user = mongoose.model('user', ItemSchema)