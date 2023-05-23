const orders=require('../models/order');
const users=require('../models/users');
const jwt=require('jsonwebtoken');

exports.updateMembership=async function(req,res,next){
    try{
        console.log(req.body);
        let order=await orders.findOne({where:{orderId:req.body.orderId}})
         console.log(order.paymentId);
            await order.update({paymentId:req.body.paymentId,status:"Successful"})
            await req.user.update({isPremium:true})
            token = jwt.sign(
                { userId: order.userId,isPremium:true},
                "secretkeyappearshere",
                { expiresIn: "1h" }
              );
            return res.json({message:'Transaction Sucessful',token:token})
       
    }catch(err){
       
    }
}

exports.updateMembershipFailed=async function(req,res,next){
    console.log(req.body);
   
    try{
        let order=await orders.findOne({where:{orderId:req.body.orderId}})
         console.log(order.status);
            await order.update({paymentId:req.body.paymentId,status:"Failed"})
            await req.user.update({isPremium:false})
             res.status(201).json({message:'Transaction Failed'})
    }catch(err){
      console.log(err)
    }
}

exports.isPremium=async function(req,res,next){
 
    let user=await users.findOne({where:{isPremium:req.user.isPremium}});
    res.json(user);
  
 
    
}