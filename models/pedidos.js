const db = require("./connection.js");

const pedido = db.sequelize.define("pedidos",{
    id_pedido:{
        type: db.Sequelize.INTEGER, allowNull:false, autoIncrement:true, primaryKey:true
    },
    id_produto:{
        type: db.Sequelize.INTEGER, allowNull:false,
    },
    quantidade:{
        type:db.Sequelize.INTEGER, allowNull:false
    }
})


module.exports = pedido;