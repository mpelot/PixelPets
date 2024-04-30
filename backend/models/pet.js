const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
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
    },
    adoptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    isAdopted: {
        type: Boolean,
        default: false
    }
});

module.exports = pet = mongoose.model('pet', ItemSchema)