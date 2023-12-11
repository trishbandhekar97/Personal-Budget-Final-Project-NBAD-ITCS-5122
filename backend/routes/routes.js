const {Router} = require('express');
const { register, login, logout, currUser, refreshToken } = require('../controller/userController');
const User = require('../models/User');
const jwt=require('jsonwebtoken');
const { getBudgets, addBudget, deleteBudget, modifyBudget } = require('../controller/budgetController');
const { getExpense, addExpense, deleteExpense, modifyExpense } = require('../controller/expenseController');
const { getDashboard } = require('../controller/dashboardController');
require("dotenv").config();
const { SECRET_KEY } = process.env;


const jwtCheck  = async (req,res,next)  => {
    const token = req.cookies['jwt'];

    if (!token) {
        return res.status(401).send();
    }

    try {
        const {iat, exp, ...decoded} = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        // 
    } catch (err) {
        console.log(err)
        return res.status(401).send('Invalid Token');
    }
    return next();
}


const router = Router();


router.post('/register', register);

router.post('/login', login)

router.post('/logout', logout)

router.use('/budget', jwtCheck)

router.route('/budget').get(getBudgets)
                                .post(addBudget)
                                .delete(deleteBudget)
                                .patch(modifyBudget)
// write profile 

router.use('/expense', jwtCheck)

router.route('/expense').get(getExpense)
                                .post(addExpense)
                                .delete(deleteExpense)
                                .patch(modifyExpense)

router.get('/jwt-check', jwtCheck, currUser);

router.get('/dashboard', jwtCheck, getDashboard);


router.post('/refresh', refreshToken);




module.exports = router;

