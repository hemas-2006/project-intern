const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({

    food: {
        type: Number,
        default: 0
    },

    travel: {
        type: Number,
        default: 0
    },

    shopping: {
        type: Number,
        default: 0
    },

    entertainment: {
        type: Number,
        default: 0
    },

    date: {
        type: String,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);