//require fs module
const fs=require('fs');

//require express
const express=require('express');

//require path module
const path=require('path');

//require body parser to parse the body
const bodyParser=require('body-parser');

//require sequelize
const sequelize=require('./utils/database');

//import users model
const users=require('./models/users');

//import expense model
const expenses=require('./models/expense');

//import orders model
const orders=require('./models/order')

//import auth middleware
const authentication=require('./utils/auth');

//import forgotpassword model
const forgotPasswords=require('./models/forgotPassword');

const forgotPasswordRoutes=require('./routes/password');

//import cors
const cors=require('cors');

//define port
const port=800;

//initialize the server
const server=express();

//import dotenv to load the environment variables
const dotenv=require('dotenv').config();

// 
server.use(bodyParser.urlencoded({extended:false}));

server.use(bodyParser.json())

server.use(cors());

//server.use(express.static(path.join(__dirname,'public')));

//import sign up routes
const signUpRoutes=require('./routes/signUp');
server.use(signUpRoutes);

//import login routes
const loginRoutes=require('./routes/login');
server.use(loginRoutes);

//import expense routes
const expenseRoutes=require('./routes/expense');
server.use(expenseRoutes);

//import purchase routes
const purchaseRoutes=require('./routes/purchase');
server.use('/purchase',purchaseRoutes)

//import updateMember routes
const updateMemberRoutes=require('./routes/updateMember');
server.use(updateMemberRoutes);

//import premium routes
const premiumRoutes=require('./routes/premium');
server.use(premiumRoutes);

//import password routes
const passwords=require('./routes/password');
server.use(passwords);

//import forgotpassword routes
const PasswordRoutes=require('./routes/forgotPassword');
server.use('/password',PasswordRoutes);


//establishing relationship between user and expense
users.hasMany(expenses);
expenses.belongsTo(users);

//relationship between orders and users
users.hasMany(orders);
orders.belongsTo(users);

//relationship between users and forgotPasswords
users.hasMany(forgotPasswords);
forgotPasswords.belongsTo(users);


sequelize.sync().then((result)=>{
    console.log(result);
    
    server.listen(port,function(err){
        try{
            if(err){
                throw err;
            }
            console.log(`Server is running on port ${port}`);
        }catch(err){
            console.log(err);
        }
    })
}).catch(err => console.log(err));
