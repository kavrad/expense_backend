const users=require('../models/users');
const expenses=require('../models/expense');
const sequelize = require('../utils/database');

exports.getLeaderBoard=async function(req,res,next){
    try{
      const Users=await users.findAll({
        order:[[sequelize.col('totalExpenses'),"DESC"]]
    });
   
      return res.status(200).json(Users);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err,status:"failed"})
    }
}