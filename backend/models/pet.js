const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rarity: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    personalityTrait: {
        type: String,
        required: true,
    }
});

module.exports = pet = mongoose.model('pet', ItemSchema)