const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;

const Usuario = require('./models/Usuario');

// Mensagem 
const mensagem = {
    msgOk: 'Logado com sucesso',
    msgError: 'Dados incorretos'
}

// Tamanho da imagem
app.use(bodyParser.json({ limit: '200mb', parameterLimit: 10000000000 }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 10000000000 }));

//Body Parser / configuração: 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rota de tentativa 
app.post("/login", (req, res) => {
    const _email = req.body.email;
    const _senha = req.body.senha;

    // Banco de Dados
    Usuario.findOne({
        where: {
            email: _email,
            senha: _senha,
        },
        attributes: ['email', 'senha']
    }).then(users => {

        const dados = users;

        if (users === null) {
            res.send({ msg: mensagem.msgError, tipo: 2 })
        } else {
            if (dados.email == _email && dados.senha == _senha) {
                res.send({ msg: mensagem.msgOk, tipo: 1 })
            } else {
                res.send({ msg: mensagem.msgError, tipo: 2 })
            }
        }
    })
})

// End point para salvar os dados de cadastro
app.post('/cadastro', (req, res) => { // Acionado ao clicar no salvar
    // Pegando os dados do front
    console.log('funcionando')
    const _nome = req.body.nome
    const _cpf = req.body.cpf
    const _emailCadastro = req.body.emailCadastro
    const _senhaCadastro = req.body.senhaCadastro
    const _telefone = req.body.telefone
    const _imagemBase = req.body.imagemBase

    Usuario.create({
        nome: _nome,
        cpf: _cpf,
        email: _emailCadastro,
        senha: _senhaCadastro,
        telefone: _telefone,
        imgBase64: _imagemBase
    }).then(users2 => {
        if (users2 != null) {
            res.send({ pMsg: '', cadastrado: 1 })
        }
    })
})

// End point para validar o e-mail de cadastro.
app.post('/validarEmail', (req, res) => {   // não é uma conexao direta com o front
    const _validarEmail = req.body.emailCadastro
    Usuario.findOne({ // procura se já existe este email no banco   
        where: {
            email: _validarEmail
        },
        attributes: ['email'] // atributo do banco
    }).then(users2 => {
        if (users2 == null) { //
            res.send({ validMensagem: '', emailLivre: 0 }) // n tem
        } else {
            res.send({ validMensagem: '', emailLivre: 1 }) // tem
        }
    })
})

// End point para enviar o email com o código de verificação
app.post('/enviarEmail', (req, res) => {
    const codigoRandomico = Math.floor(Math.random() * 99999999)
    const emailPageSenha = req.body.emailRecuperarSenha
    const nodemailer = require('nodemailer')
    const SMTP_CONFIG = require('./config/smtp')
    const transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user: SMTP_CONFIG.user,
            pass: SMTP_CONFIG.pass,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    Usuario.update({ reqCodigo: codigoRandomico }, {
        where: {
            email: emailPageSenha
        }
    });

    async function EnviarEmail() {

        const mailSent = await transporter.sendMail({
            subject: 'Redefinir senha',
            from: 'Lighthouse <raymeloc@gmail.com',
            to: [emailPageSenha],
            text: `Código para redefinir a senha: ${codigoRandomico}`,
        })

        return res.send({ enviado: 1 })

        console.log(mailSent)
    }
    EnviarEmail()
})

// End point para validar e atualizar o Código no banco de dados
app.post('/validarCodigo', (req, res) => {
    const codigoFront = req.body.validarCodigo
    console.log('codigo do front ' + codigoFront)
    Usuario.findOne({
        where: {
            reqCodigo: codigoFront,
        },
        attributes: [
            'reqCodigo'
        ]
    }).then(users3 => {
        if (users3 == null) {
            res.send({ codigoMsg: '', validarCodigo: 0 })
        } else {
            res.send({ codigoMsg: '', validarCodigo: 1, link: '/novaSenha' }) // codigo válido
        }
    })
})

// End point para uptade da nova senha 
app.post('/salvarNovaSenha', (req, res) => {
    const _novaSenha = req.body.novaSenha // senha digitada
    const _redefinirEmail = req.body.redefinirEmail // email que identifica qual é o usuário que vai alterar

    // Update da senha no banco
    Usuario.update({ senha: _novaSenha }, {
        where: {
            email: _redefinirEmail
        }
    }).then(users4 => {
        if (users4 == null) {
            res.send({ redefiniu: 0 })
        } else {
            res.send({ redefiniu: 1 }) // senha nova salva 
        }
    })
})

// End point para pegar a imagem
app.post('/imagem', (req, res) => {
    const _emailImagem = req.body.emailImagem

    Usuario.findOne({ // procura se já existe este email no banco   
        where: {
            email: _emailImagem
        },
        attributes: ['imgBase64'] // atributo do banco
    }).then(users4 => {
        let codigoBase64 = users4.imgBase64;
        let buf = Buffer.from(codigoBase64, 'base64').toString('utf-8');
        console.log(buf);
        res.send({ msg: buf });
    })

})

app.listen(port, () => console.log(`Listening on port ${port}`));

