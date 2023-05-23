const express=require('express');
const authentication=require('../utils/auth');
const router=express.Router();
router.post('/forgot-password',authentication.authenticate,require('../controllers/forgotPassword').forgotPassword);
router.get('/resetpassword/:id',require('../controllers/forgotPassword').resetPassword);
router.get('/updatepassword/:resetpasswordid',require('../controllers/forgotPassword').updatePassword)
module.exports=router;