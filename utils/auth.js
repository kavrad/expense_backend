const jwt=require('jsonwebtoken');
const users=require('../models/users');

const authenticate=function(req,res,next){
    try{

    
    const token=req.headers.authorization;
    console.log(token);
    const decoded=jwt.verify(token,"secretkeyappearshere")
    console.log('User id >>>',decoded.userId);
    console.log(' Is Premium>>>',decoded.isPremium);
    users.findOne({where:{id:decoded.userId}}).then((user)=>{
        console.log(user)
       console.log(JSON.stringify(user))
       req.user=user;
       next();
    }).catch(err => console.log(err))
}catch(err){
    console.log(err)
  res.status(400).json({status:false,message:'Something went wrong'});
}
}
module.exports={authenticate};