const {Sequelize, DataTypes}=require('sequelize');
const sequelize=require('../utils/database');
const Recipt=sequelize.define('Recipt',{
   vendor: DataTypes.STRING,
    date: DataTypes.DATE,
    amount: DataTypes.FLOAT,
    category: DataTypes.STRING,
})
module.exports=Recipt;