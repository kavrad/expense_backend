const express=require('express');
const path=require('path');
const router=express.Router();

router.get('/',function(req,res,next){
    res.sendFile(path.join(__dirname,'..','views','signUp.html'));
})

router.post('/add-user',require('../controllers/signUpController').signUp)
module.exports=router;