const path=require('path');
const expenses=require('../models/expense');
const users=require('../models/users');
const sequelize=require('../utils/database');


exports.addExpense=function(req,res,next){
res.sendFile(path.join(__dirname,'..','views','addExpenses.html'));
}

exports.postAddExpense=async function(req,res,next){
  const t=await sequelize.transaction();
   try{

    
     console.log(req.body);
     
        const newExpense=await expenses.create({
         expenseAmount:req.body.expenseAmount,
         desc:req.body.desc,
         category:req.body.category,
         userId:req.user.id,
         
      },{transaction:t})
        // const totalExpense=Number(req.user.totalExpenses)+Number(req.body.expenseAmount);
         const user=await users.findOne({where:{id:req.user.id},transaction:t});
         user.totalExpenses=Number(req.body.expenseAmount)+user.totalExpenses;
         user.save();
        await t.commit();
         res.redirect('/show-expense');
      
    }catch(err){
      console.log(err);
      await t.rollback();
      res.status(400).json({success:false})
    }
  }
exports.showExpense=function(req,res,next){
   try{
   expenses.findAll({where:{userId:req.user.id}}).then((expense)=>{
     return res.json(expense);
   })
}catch(err){
    res.json(JSON.stringify(err))
}
}

exports.getExpense=async function(req,res,next){
  const page= +req.query.page || 1;
  const expense_per_page=+req.query.pagelimit;
  try{
    let totalExpenses;
  console.log('query>>',page);
 const expenseCount=await expenses.count({where:{userId:req.user.id}});
 console.log('count>>',expenseCount);
   totalExpenses=expenseCount;
   const expenseList=await expenses.findAll({where:{userId:req.user.id},offset:(page-1)*expense_per_page,limit:expense_per_page})
   console.log('expense list',expenseList);
   res.status(200).json({
      expenses:expenseList,
      currentpage:page,
      hasNextPage:expense_per_page*page<totalExpenses,
      nextPage:page+1,
      hasPreviousPage:page>1,
      previousPage:page-1,
      lastPage:Math.ceil(totalExpenses/expense_per_page)
   })
  }catch(err){
    console.log(err);
    res.status(500).json();
  }
  
  }
  