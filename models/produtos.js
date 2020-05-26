const db = require("./connection.js");

const produto = db.sequelize.define("produtos",{
    id_produto:{
        type: db.Sequelize.INTEGER, allowNull:false, autoIncrement:true, primaryKey:true
    },
    nome:{
        type:db.Sequelize.STRING, allowNull:false
    },
    preco:{
        type:db.Sequelize.FLOAT, allowNull:false
    }
})

module.exports = produto;