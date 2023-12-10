const Budget = require('../models/Budget');


const getBudgets = async (req,res) => {

    var currUser = req.user;

    try {
        const budgets = await Budget.find({ createdBy: currUser._id});
        return res.status(200).json({
            status: "success",
            data: budgets
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
   
}


const addBudget = async (req,res) => {

    var currUser = req.user;

    const budgetData = {
        ...req.body, 
        createdBy: currUser.user._id
    };

    try {
        const newBudget = new Budget(budgetData);
        const savedBudget = await newBudget.save();
        res.status(201).json({
            status: "success"
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const modifyBudget = async (req,res) => {
    console.log(req)
    
    var { _id, ...modifiedData} = req.body;
    var currUser = req.user;

    console.log(_id);

    var currBudget = await Budget.findById(_id)

    if(!currBudget) {
        return res.status(404).json({
            status: "failure",
            message: "Budget not found"
        })
    }

    if(currBudget.createdBy != currUser._id) {
        return res.status(400).json({
            status: "failure",
            message: "Cannot update Budget"
        })
    }

    try {
        await Budget.findByIdAndUpdate(_id, modifiedData, { new: true });

        return res.status(201).json({
            status: "success",
            message: "Budget updated"
        })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }

}

const deleteBudget = async(req,res) => {


    var { id } = req.body;
    var currUser = req.user;

    var currBudget = await Budget.findById(id)

    if(currBudget.createdBy != currUser._id) {
        return res.status(400).json({
            status: "failure",
            message: "Cannot delete Budget"
        })
    }

    try {
        await Budget.findByIdAndDelete(id);

        return res.status(201).json({
            status: "success",
            message: "Budget deleted"
        })
    } catch(err) {
        return res.status(500).json({ message: error.message });
    }

}


module.exports = {
    getBudgets,
    addBudget,
    modifyBudget,
    deleteBudget
}