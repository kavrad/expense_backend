const express=require('express');
const authentication=require('../utils/auth');
const router=express.Router();
router.get('/get-premium',authentication.authenticate,require('../controllers/updateMember').isPremium)
module.exports=router;