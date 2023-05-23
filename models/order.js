const {Sequelize, DataTypes}=require('sequelize');
const sequelize=require('../utils/database');

const orders=sequelize.define('orders',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    orderId:{
        type:DataTypes.STRING
    },
    paymentId:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.STRING
    }
})
module.exports=orders;