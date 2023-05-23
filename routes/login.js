const express=require('express');
const router=express.Router();

router.get('/login',require('../controllers/loginController').login)

router.post('/user/login',require('../controllers/loginController').postLogin);

module.exports=router;