const {v4 : uuidv4} = require('uuid');
const Sib=require('sib-api-v3-sdk');
const bycrypt=require('bcrypt');
require('dotenv').config();
const path=require('path');
const forgotPasswordsModel=require('../models/forgotPassword');
const users=require('../models/users');

exports.showForgotPassword=function(req,res,next){
    return res.sendFile(path.join(__dirname,'..','views','forgotPassword.html'));
}

exports.forgotPassword=async function(req,res,next){
    try{
        const id=uuidv4();
    const user=await users.findOne({where:{email:req.body.email}})
    if(user){
        
        forgotPasswordsModel.create({
            id:id,
            active:true,
            userId:user.id
        }).catch((err)=>{
            throw new Error(err);
        })
    
 const client= Sib.ApiClient.instance;
 const apiKey=client.authentications['api-key'];
 apiKey.apiKey=process.env.SEND_KEY;
 const tranEmailApi=new Sib.TransactionalEmailsApi();
 const sender={
    email:'kavyaht39@gmail.com',
    name:'Kavya'
 }
 const recievers=[
    {
        email:req.body.email
    }
 ]
 const result=await tranEmailApi.sendTransacEmail({
    sender,
    to:recievers,
    subject:'reset password',
    textContent:'It is a reset password link',
    htmlContent:`<a href="http://localhost:800/password/resetpassword/${id}">Reset password</a>`
 })
 console.log(result);
 res.status(200).json({message:'Link to reset password sent to your mail ', sucess: 'true',link:"http://localhost:800/password/resetpassword/${id}"})
}else{
    throw new Error('User doesnt exist')
}
}catch(err){
    console.log(err);
    return res.json({ message: err, sucess: false });
}
}

exports.showResetPassword=function(req,res,next){
    return res.sendFile(path.join(__dirname,'..','views','resetpassword.html'));
}

exports.resetPassword=function(req,res,next){
    const id=req.params.id;
    forgotPasswordsModel.findOne({where:{id:id}}).then((password)=>{
      if(password){
        password.update({active:false});
        //res.sendFile(__dirname,'..','views','updatePassword.html');
        res.status(200).send(`
          <html>
          <head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
          <link rel="stylesheet" href="/css/update-password.css">
          </head>
          <body>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
          <script>
          async function formSubmit(e){
            const newPassword=document.getElementById('newpassword').value;
            e.preventDefault();
            console.log('called');
            const result=await axios.post("http://localhost:800/password/updatepassword/${id}",{password:newPassword});
            
          }
        }
          </script>
          <div class="wrapper">
          <p style="text-align:center;font-family:Abril fontFace;font-size:2em;color:white;">Update Password</p>
        
          <form action="/password/updatepassword/${id}" method="get">
          <label for="newpassword">Enter New password:</label>
         <input name="newpassword" type="password" id="newpassword" required></input><br>
         <button>reset password</button>
          </form>
          </div>
          </body>
        `)
        res.end();
      }
    })
}

exports.updatePassword=function(req,res,next){
    try{
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        console.log(newpassword,resetpasswordid);
        forgotPasswordsModel.findOne({where:{id:resetpasswordid}}).then((resetpasswordrequest )=>{
            console.log(resetpasswordrequest.userId);
            users.findOne({where:{id:resetpasswordrequest.userId}}).then((user)=>{
                console.log(user);
                if(user){
                    const saltRounds=10;
                    bycrypt.genSalt(saltRounds,function(err,salt){
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bycrypt.hash(newpassword,salt,function(err,hash){
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({password:hash}).then(()=>{
                                res.status(201).send('<h3>Sucessfully updated new password</h3>');
                                //res.status(201).json({message:'sucesssfully updated new password'});

                            })
                        })
                    })
                }else{
                    return res.status(404).json({ error: 'No user Exists', success: false})
                }
            })
        })
    }catch(err){
        return res.status(403).json({ err, success: false } )

    }
}