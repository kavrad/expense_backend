const express=require('express');
const authentication=require('../utils/auth');
const router=express.Router();

router.post('/updatemembership',authentication.authenticate,require('../controllers/updateMember').updateMembership)

router.post('/updatemembershipFailed',authentication.authenticate,require('../controllers/updateMember').updateMembershipFailed);

module.exports=router;