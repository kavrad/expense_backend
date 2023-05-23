const express=require('express');
const path=require('path');
const router=express.Router();
const upload=require('../utils/multer');
router.get('/fileRead',(req,res)=>{
    res.redirect('/file/read');
})
router.get('/file/read',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','recipt.html'));
})
router.post('/upload',upload.single('image'),require('../controllers/ReciptController').reciptPost);
module.exports=router;