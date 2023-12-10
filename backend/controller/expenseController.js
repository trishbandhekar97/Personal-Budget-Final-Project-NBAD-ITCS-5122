const Expense = require('../models/Expense');


const getExpense = async(req, res) => {
    var currUser = req.user;

    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 2;
    const startIndex = page * limit;

    try {
        const total = await Expense.countDocuments();
        const expenses = await Expense
            .find({ createdBy: currUser._id})
            .limit(limit)
            .skip(startIndex)
            .populate('budget')
            .exec();

        return res.status(200).json({
            status: "success",
            data: {
                totalItems: total,
                totalPages: Math.ceil(total/limit),
                currentPage: page,
                expenses
            }
        });
    } catch(error) {
        return res.status(500).json({ message: error.message});
    }
}


const addExpense = async(req,res) => {

    var currUser = req.user;

    const expenseData = {
        ...req.body,
        createdBy: currUser.user._id
    };

    try {
        const newExpense = new Expense(expenseData);
        const savedExpense = await newExpense.save();
        return res.status(201).json({
            status: "success"
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const modifyExpense = async(req, res) => {

    var { _id, ...modifiedData } = req.body;
    var currUser = req.user;

    var currExpense = await Expense.findById(_id);

    if(!currExpense) {
        return res.status(404).json({
            status: "failure",
            message: "Expense not found"
        })
    }

    if(currExpense.createdBy != currUser._id) {
        return res.status(400).json({
            status: "failure",
            message: "Cannot update Expense"
        })
    }

    try {
        await Expense.findByIdAndUpdate(_id, modifiedData, { new: true });

        return res.status(201).json({
            status: "success",
            message: "Expense updated"
        })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }

}

const deleteExpense = async(req,res) => {

    var {id} = req.body;

    var currUser = req.user;

    var currExpense = await Expense.findById(id);

    if(currExpense.createdBy != currUser._id) {
        return res.status(400).json({
            status: "failure",
            message: "Cannot delete Expense"
        })
    }

    try {
        await Expense.findByIdAndDelete(id)

        return res.status(201).json({
            status: "success",
            message: "Expense deleted"
        })
    } catch(error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

module.exports = {
    getExpense,
    addExpense,
    modifyExpense,
    deleteExpense
}