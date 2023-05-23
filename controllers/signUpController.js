const users=require('../models/users');
const path=require('path');
const bcrypt=require('bcrypt');

exports.signUp= async function(req,res,next){
   console.log(req.body.password);
   const response=await users.findOne({where:{email:req.body.email}});
   console.log(response);
   if(response === null){
    bcrypt.hash(req.body.password,10,function(err,hash){
        if(err){
            console.log(err);
            return;
        }
        users.create({
            name:req.body.name,
            email:req.body.email,
            password:hash
        }).then(()=>{
        res.redirect('/login');
        }).catch(err => console.log(err))
    })
   }else{
    res.send("The user already exists");
   }
  
   }
   
  

