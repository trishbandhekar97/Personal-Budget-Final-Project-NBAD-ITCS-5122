const mongoose = require('mongoose')


const budgetSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        budget: {
            type: Number,
            required: true,
        },
        color: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                    return /^#[0-9A-Fa-f]{6}$/.test(v);
                },
                message: props => `${props.value} is not a valid color code! It should start with '#' and be exactly 7 characters long.`
            }
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }
    }
)


module.exports = mongoose.model('Budget', budgetSchema);



