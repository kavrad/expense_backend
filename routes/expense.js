const express=require('express');
const authentication=require('../utils/auth');

const router=express.Router();

router.get('/expense',require('../controllers/addExpensesController').addExpense)

router.post('/add-expense',authentication.authenticate,require('../controllers/addExpensesController').postAddExpense)

router.get('/show-expense',authentication.authenticate,require('../controllers/addExpensesController').showExpense)

router.delete('/delete-expense/:id',authentication.authenticate,require('../controllers/deleteExpenseController').deleteExpense)

router.get('/expenses',authentication.authenticate,require('../controllers/addExpensesController').getExpense)

module.exports=router;