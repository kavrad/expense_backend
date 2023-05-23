const {Sequelize, DataTypes}=require('sequelize');
const sequelize=require('../utils/database');
const forgotPassword=sequelize.define('forgotPasswords',{
    id:{
        type:DataTypes.STRING,
        allowNull:false,
        primaryKey:true
    },
    active:DataTypes.BOOLEAN,
    
})
module.exports=forgotPassword;