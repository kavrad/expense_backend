const path=require('path');
const users=require('../models/users');
const becrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
exports.login=function(req,res,next){
    res.sendFile(path.join(__dirname,'..','views','login.html'))
}


exports.postLogin=async function(req,res,next){
    const email=req.body.email;
    const password=req.body.password;
  let responseEmail=await users.findOne({where:{email:req.body.email}});
  //res.json(responseEmail);

  //console.log(responseEmail.id);

    exports.generateToken=function(id,isPremium){
      return jwt.sign(
        { userId: id,isPremium:isPremium},
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );
    }

    token = jwt.sign(
        { userId: responseEmail.id,isPremium:responseEmail.isPremium},
        "secretkeyappearshere",
        { expiresIn: "1h" }
      );

    becrypt.compare(password,responseEmail.password,function(err,same){
     if(err){
      res.json(err);
      return;
     }
   if(same){
    //res.json(responseEmail,{token:generateToken});
    res
    .status(201)
    .json({
      success: true,
      data: { responseEmail: responseEmail, token: token},
    });

    
   }else{
    res.json('The password is incorrect')
    }
  })
   
   
  //})
  
  //let responsePassword=await users.findOne({where:{password:password}})
console.log(responseEmail.password,responseEmail.email);
}

    