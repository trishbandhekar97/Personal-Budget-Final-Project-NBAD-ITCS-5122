const Budget = require("../models/Budget");
const Expense = require("../models/Expense");

const getDashboard = async(req, res) => {

    var currUser = req.user;
    var filter = req.query.filter;
    console.log(filter)


    try {

        var [startDate, endDate] = getDates(filter);
        let totalExpenses;
        var allExpenses;

        
        const allBudgets = await Budget.find({ createdBy: currUser._id});

        let totalBudget = allBudgets.reduce((sum, currentBudget) => {
            return sum + currentBudget.budget;
        }, 0);


        if(startDate instanceof Date && endDate instanceof Date) {
            allExpenses = await Expense.find({ 
                createdBy: currUser._id,
                createdAt: { $gte: startDate, $lte: endDate }
            }).sort({ createdAt: -1 }).populate('budget')
        } else {
            allExpenses = await Expense.find({
                createdBy: currUser._id
            }).sort({ createdAt: -1 }).populate('budget')
        }

        console.log(allExpenses)

       

        totalExpenses = allExpenses.reduce((sum, currExpense) => {
            return sum + currExpense.amount
        },0);




        const labels = allBudgets.map(budget => budget.title);
        const values = allBudgets.map(budget => budget.budget);
        const colors = allBudgets.map(budget => budget.color);

        const budgetDataForPieChart = {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: colors
            }]
        };




        const groupedByBudget = allExpenses.reduce((accumulator, currentExpense) => {
            // Use the budget ID as the key for grouping
            const budgetId = currentExpense.budget._id.toString();
        
            // If the budget doesn't exist in the accumulator, initialize it
            if (!accumulator[budgetId]) {
                accumulator[budgetId] = {
                    budget: {
                        title: currentExpense.budget.title,
                        budget: currentExpense.budget.budget,
                        color: currentExpense.budget.color,
                    },
                    totalExpense: 0
                };
            }
        
            // Increment the total expenses for this budget group
            accumulator[budgetId].totalExpense += currentExpense.amount;
        
            return accumulator;
        }, {});
        
        // Convert the object to an array of the desired format
        const groupedExpensesArray = Object.values(groupedByBudget);

        const groupedByDate = allExpenses.reduce((accumulator, currentExpense) => {
            console.log(currentExpense)
            // Extract the date part (YYYY-MM-DD) from the createdAt timestamp
            const expenseDate = currentExpense.createdAt.toISOString().split('T')[0];
        
            // If the date doesn't exist in the accumulator, initialize it
            if (!accumulator[expenseDate]) {
                accumulator[expenseDate] = {
                    date: expenseDate,
                    totalExpense: 0,
                    expenses: []
                };
            }
        
            // Increment the total expenses for this date
            accumulator[expenseDate].totalExpense += currentExpense.amount;
        
            // Optionally, keep track of each expense for this date
            accumulator[expenseDate].expenses.push(currentExpense);
        
            return accumulator;
        }, {});
        
        const simplifiedExpenses = Object.keys(groupedByDate).map(date => {
            return {
                date: date,
                expense: groupedByDate[date].totalExpense
            };
        });
        


        return res.status(200).json({
            totalBudget: totalBudget,
            totalExpenses: totalExpenses,
            recentExpenses: allExpenses.slice(0,5),
            budgetPie: budgetDataForPieChart,
            expensesPie: groupedExpensesArray,
            expensesLine: simplifiedExpenses
        })

    } catch(error) {
        return res.status(500).json({ message: error.message});
    }

}


function getDates(filter) {

    const currentDate = new Date();
    let startDate;

    switch(filter) {
        case "LAST_MONTH":
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
            break;
        case "LAST_3_MONTHS":
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
            break;
        default:
            // Covers "ALL_TIME" and any other undefined filters
            return [-1, -1];
    }

    return [startDate, currentDate];
}



module.exports = {
    getDashboard
}