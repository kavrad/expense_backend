const {Sequelize}=require('sequelize');

const sequelize=new Sequelize('expenses','root','kavrad#716',{
    dialect:'mysql',
    host:'localhost',
});
module.exports=sequelize;