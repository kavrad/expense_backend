const {Sequelize, DataTypes} =require('sequelize');
const sequelize=require('../utils/database');
const Expenses=sequelize.define('expenses',{
    Id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    expenseAmount:{
        type:DataTypes.INTEGER,
        defaultValue:0
    },
    desc:{
        type:DataTypes.STRING
    },
    category:{
        type:DataTypes.STRING
    }
})
module.exports=Expenses;