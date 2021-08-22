const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    telefone: {
        type: db.Sequelize.STRING
    },
    imgBase64: {
        type: db.Sequelize.BLOB('long')
    },
    reqCodigo: {
        type: db.Sequelize.STRING
    }
})

//Usuario.sync({force: true})

module.exports = Usuario
