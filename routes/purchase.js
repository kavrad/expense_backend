const express=require('express');
const authentication=require('../utils/auth');

const router=express.Router();

router.get('/premiumMembership',authentication.authenticate,require('../controllers/purchasePremiumController').purchasePremium)

router.get('/leaderboard',authentication.authenticate,require('../controllers/leaderBoardController').getLeaderBoard)
module.exports=router;