const mongoose = require('mongoose')

const expenseSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    budget: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Budget', 
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the date when a new record is created
    }
});

module.exports = mongoose.model('Expense', expenseSchema);
