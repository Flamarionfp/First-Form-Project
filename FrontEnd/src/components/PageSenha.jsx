import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

const PageSenha = () => {

    const [btnEnviarEmail, setbtnEnviarEmail] = useState('')
    const [tipoCadastro, setTipoCadastro] = useState('')
    const [hLink, sethLink] = useState('')
    const [alertCodigo, setalertCodigo] = useState('')
    const [alertNovaSenha, setNovaSenha] = useState('')

    const verificarEmail = () => {

        const alertEmail = document.getElementById('alertEmail')
        const btnEnviarEmail = document.getElementById('btnEnviarEmail')

        fetch('/validarEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                emailCadastro: document.getElementById('emailRecSenha').value
            })
        }).then(response => response.json()).then(json => {
            var msgBack = json.validMensagem
            if (json.emailLivre === 1) {
                alertEmail.style.display = 'none'
                setbtnEnviarEmail('')
                btnEnviarEmail.style.opacity = '1'
            } else {
                msgBack = 'E-mail não cadastrado no sistema!'
                document.getElementById('msgAlertEmail').innerHTML = msgBack
                setTipoCadastro('error')
                alertEmail.style.display = 'inline-flex'
                setbtnEnviarEmail('disable')
                btnEnviarEmail.style.opacity = '0.4'
            }
        })
    }

    // Quando o email for válido
    const enviarEmail = () => {

        const alertEmailValido = document.getElementById('alertEmail')
        const inputEmailRecSenha = document.getElementById('emailRecSenha').value

        const parteEmail = document.getElementById('parteEmail')
        const parteCodigo = document.getElementById('parteCodigo')

        if (inputEmailRecSenha.length === 0) {
            alertEmailValido.style.display = 'inline-flex'
            setTipoCadastro('error')
        } else {
            alertEmailValido.style.display = 'inline-flex'
            document.getElementById('msgAlertEmail').innerHTML = 'Aguarde um instante...'
            setTipoCadastro('info')
            fetch('/enviarEmail', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    emailRecuperarSenha: document.getElementById('emailRecSenha').value,
                })
            }).then(response => response.json()).then(json => {
                if (json.enviado === 1) {
                    parteEmail.style.display = 'none'
                    parteCodigo.style.display = 'block'
                }
            })
        }
    }

    // Validando o código
    const validarCodigo = () => {
        console.log('entrei')

        const inputCodigo = document.getElementById('inputCodigo').value
        const mensagemCodigo = document.getElementById('alertCodigo')
        const parteCodigo = document.getElementById('parteCodigo')
        const parteNovaSenha = document.getElementById('parteNovaSenha')

        if (inputCodigo.length === 0) {
            document.getElementById('msgAlertCodigo').innerHTML = 'Código inválido';
            setalertCodigo('error');
            mensagemCodigo.style.display = 'inline-flex';
        } else {
            mensagemCodigo.style.display = 'none';
            fetch('/validarCodigo', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    validarCodigo: document.getElementById('inputCodigo').value
                })
            }).then(response => response.json()).then(json => {
                if (json.validarCodigo === 0) {
                    document.getElementById('msgAlertCodigo').innerHTML = 'Código incorreto';
                    setalertCodigo('error');
                    mensagemCodigo.style.display = 'inline-flex';
                } else {
                    mensagemCodigo.style.display = 'none';
                    parteCodigo.style.display = 'none';
                    parteNovaSenha.style.display = 'block'
                }
            })
        }
    }

    // Validando a nova senha
    const salvarNovaSenha = () => {

        const senhaNova = document.getElementById('SenhaNova').value
        const confirmarSenha = document.getElementById('ConfirmarSenha').value
        const alertaNovaSenha = document.getElementById('alertNovaSenha')

        if (senhaNova.length === 0 || confirmarSenha.length === 0) {
            document.getElementById('msgNovaSenha').innerHTML = 'Preencha todos os campos!'
            setNovaSenha('error')
            alertaNovaSenha.style.display = 'inline-flex'
        } else if (senhaNova !== confirmarSenha) {
            document.getElementById('msgNovaSenha').innerHTML = 'As senhas não são iguais!'
            setNovaSenha('error')
            alertaNovaSenha.style.display = 'inline-flex'
        } else if (senhaNova.length < 6) {
            document.getElementById('msgNovaSenha').innerHTML = 'Use seis ou mais caracteres!'
            setNovaSenha('error')
            alertaNovaSenha.style.display = 'inline-flex'
        } else {
            fetch('/salvarNovaSenha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    redefinirEmail: document.getElementById('emailRecSenha').value,
                    novaSenha: document.getElementById('SenhaNova').value
                })
            }).then(response => response.json()).then(json => {
                if (json.redefiniu === 1) {
                    document.getElementById('msgNovaSenha').innerHTML = 'Senha alterada com sucesso!'
                    setNovaSenha('success')
                    alertaNovaSenha.style.display = 'inline-flex'
                }
            })
        }
    }

    return (
        <Grid className='BoxWhite'
            style={{
                minHeight: "15vh",
                maxWidth: "400px",
            }}>

            {/* Grid do Email */}
            <Grid id='parteEmail'>

                {/* Email */}
                <Grid container>
                    <p className="Login">Insira seu Email</p>
                    <input
                        type="email"
                        name="email"
                        placeholder="kristine.muller@lighthouse.com.br"
                        className="EmailSenha"
                        id="emailRecSenha"
                        onChange={verificarEmail}
                        autocomplete="off" />
                </Grid>

                {/* Alerta */}
                <Alert
                    id='alertEmail'
                    severity={tipoCadastro}
                    style={{ marginTop: '10px' }}>
                    <p id='msgAlertEmail'> Insira um email válido</p>
                </Alert>

                <Button disabled={btnEnviarEmail} id='btnEnviarEmail' onClick={enviarEmail} >
                    Enviar email
                </Button>
            </Grid>

            {/* Grid do Código */}
            <Grid id='parteCodigo'
            >
                <Grid container>
                    <p className="Login">Digite o código</p>
                    <input
                        id='inputCodigo'
                        className="EmailSenha"
                        placeholder="código"
                        style={{
                            marginBottom: '5px'
                        }}></input>
                </Grid>

                <Alert
                    id='alertCodigo'
                    severity={alertCodigo}
                >
                    <p id='msgAlertCodigo' />
                </Alert>

                <Button onClick={() => validarCodigo()} id='btnValidar' >
                    Validar
                </Button>

                <Link to={hLink} >
                    <Button
                        variant="contained"
                        id='btnContinuarSenha'
                        style={{ backgroundColor: '#000' }}> Continuar</Button>
                </Link>
            </Grid>

            {/* Grid da Nova Senha */}
            <Grid id='parteNovaSenha'>

                {/* Senha */}
                <Grid container>
                    <p className="Login">Digite a nova senha</p>
                    <input
                        type="password"
                        placeholder=" •••••••••"
                        className="EmailSenha"
                        id="SenhaNova" />
                </Grid>

                {/* Confirmação de senha */}
                <Grid container style={{ marginTop: '-10px' }}>
                    <p className="Login">Confirmar senha</p>
                    <input
                        type="password"
                        placeholder=" •••••••••"
                        className="EmailSenha"
                        id="ConfirmarSenha" />
                </Grid>

                <Alert
                    id='alertNovaSenha'
                    severity={alertNovaSenha}
                    style={{
                        marginBottom: '10px'
                    }}>
                    <p id='msgNovaSenha'></p>
                </Alert>

                <Button
                    id='btnConfSenha'
                    onClick={() => salvarNovaSenha()}
                    style={{ backgroundColor: '#000' }}>
                    Salvar
                </Button>
            </Grid>

            {/* Voltar */}
            <Link id='voltar' to='/' style={{ marginLeft: '175px' }}>Voltar</Link>

        </Grid>
    )
}
export default PageSenha