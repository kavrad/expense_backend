const tesseract = require('node-tesseract-ocr');
const upload=require('../utils/multer');
const Recipt=require('../models/Recipt');
exports.reciptPost=async function(req,res){
    try{
        const config = {
            lang: "eng",
            oem: 1,
            psm: 3,
          }
          
          const text=await tesseract.recognize(req.file.path, config);
          console.log(text);
         const {vendor,date,amount,category}=extractReceiptData(req.body);
         console.log(text);
         
         const recipt=await Recipt.create({
            vendor,
            date,
            amount,
            category
         })
         res.json({recipt:recipt,text:text});
            
    }catch(err){
     console.log(err);
     res.status(500).json({message:err.message})
    }
}

//    
function extractReceiptData(data) {
    
    const vendor = data.vendor || null;
      const date = data.date ? new Date(data.date) : null;
      const amount = data.amount || null;
      const category = getCategoryFromText(data.text || '');
  
    
  
    return {
      vendor,
      date,
      amount,
     category,
    };
  }
 

  

function getCategoryFromText(text) {
    const categories = {
      food: /groceries|restaurant|food/gi,
      transportation: /gas|car rental|car wash/gi,
      entertainment: /movie|music|book/gi,
      shopping: /clothing|electronics|furniture/gi,
    };
  
    for (const [category, regex] of Object.entries(categories)) {
      if (text.match(regex)) {
        return category;
      }
    }
  
    return 'other';
  }
