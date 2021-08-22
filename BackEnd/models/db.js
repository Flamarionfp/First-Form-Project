// configuração do banco de dados
const Sequelize = require('sequelize')
// Conectando o banco com o sequelize
const sequelize = new Sequelize('userlogin', 'user', 'senha', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3360
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}