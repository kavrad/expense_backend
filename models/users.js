const {Sequelize,DataTypes}=require('sequelize');
const sequelize=require('../utils/database');
const Users=sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
 
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        
    },
    password:{
        type:DataTypes.STRING
    },
    isPremium:{
        type:DataTypes.BOOLEAN
    },
    totalExpenses:{
        type:DataTypes.INTEGER,
        defaultValue:0
    }
})
module.exports=Users;