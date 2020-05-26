const Sequelize = require("sequelize");

const sequelize = new Sequelize("API","root","phone8.1",{
    host:"localhost",
    dialect: "mysql"
});

module.exports={
    Sequelize: Sequelize,
    sequelize: sequelize
};