// const rzp=require('razorpay');
const orders=require('../models/order')

// exports.purchasePremium=function(req,res,next){
//   try{
//     const razorpay=new rzp({
//          key_id:"rzp_test_AXju51VVyyxDe7",
//          key_secret:"kyzUqH7cqFHzQRgxp12KcOXE"
//     })
    
//     const amount=2500;
//    razorpay.orders.create({amount:amount,currency:"INR"},(err,data)=>{
//      if(err){
//         console.log(err);
//         return;
//      }
//      orders.create({
//         orderId:data.id,
//         status:"Pending",
//         userId:req.user.id
//      }).then(()=>{
//         res.status(201).json({data,key_id:razorpay.key_id})
//      }).catch(err =>{
//         throw err;
//      })
//    })
   
//   }catch(err){
//     console.log(err);
//   }
// }

const razorpay=require('razorpay');
exports.purchasePremium=function(req,res){
   try{

   
   let rzp=new razorpay({
      key_id:`${process.env.KEY_ID}`,
      key_secret:`${process.env.KEY_SECRET}`
   })
   rzp.orders.create({amount:250000,currency:"INR"},function(err,data){
      if(err){
         console.log(err);
         JSON.stringify(err)
      }
      orders.create({
         orderId:data.id,
         status:"Pending",
         userId:req.user.id
      }).then(()=>{
         res.status(201).json({data,key_id:`${process.env.KEY_ID}`});
      }).catch(err => console.log(err))
   })
}catch(err){
   res.status(404).json("Something went wrong");
}
}