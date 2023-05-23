const express=require('express');
const router=express.Router();
router.get('/forgotpassword',require('../controllers/forgotPassword').showForgotPassword)
module.exports=router;

