import React, { useState } from 'react';
import { Alert } from '@material-ui/lab';
import { Grid, Button } from '@material-ui/core'

import LogoApple from '../images/apple.png';
import Facebook from './Facebook';
import Twitter from './Twitter';

import { Link } from 'react-router-dom'

const BoxWhite = (props) => {

    const [tipo, setTipo] = useState('')

    // Validação
    const valid = () => {
        const email = document.getElementById('EmailLogin').value
        const senha = document.getElementById('SenhaLogin').value
        const aparecerEmail = document.getElementById('avisoEmail')
        const aparecerSenha = document.getElementById('avisoSenha')
        const alert = document.getElementById('alert')

        // Email
        if (!email.includes('@') || !email.includes('.') || email.length === 0) {
            aparecerEmail.style.display = 'block'
        } else {
            aparecerEmail.style.display = 'none'
        }

        // Senha
        if (senha.length === 0) {
            aparecerSenha.style.display = 'block'
        } else {
            aparecerSenha.style.display = 'none'

            // Alert
            alert.style.display = 'block'
            fetch(props.URL, {  // o fetch seria uma porta de entrada para o back
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: document.getElementById('EmailLogin').value,
                    senha: document.getElementById('SenhaLogin').value
                })
            })
                .then(response => response.json())
                .then(json => {
                    document.getElementById('msg').innerHTML = json.msg;
                    if (json.tipo === 1) {
                        setTipo('success');
                    } else {
                        setTipo('error');
                    }
                })
        }
    }

    // Manipulação do input
    const focusEmail = () => {
        const email = document.getElementById('EmailLogin')
        email.style.borderColor = '#737088'
    }

    const focusSenha = () => {
        const senha = document.getElementById('SenhaLogin')
        senha.style.borderColor = '#737088'
    }

    const blurEmail = () => {
        const email = document.getElementById('EmailLogin')
        if (email.value.length === 0) {
            email.style.borderColor = '#ff0000'
        }
    }

    const blurSenha = () => {
        const senha = document.getElementById('SenhaLogin')
        if (senha.value.length === 0) {
            senha.style.borderColor = '#ff0000'
        }
    }

    return (
        <Grid container justify="center" alignItems="center"
            style={{
                minHeight: "15vh",
                maxWidth: "400px",
            }}

            className="BoxWhite">

            <Grid container justify="center">
                <img className="Apple" src={LogoApple} alt='img' />
                <p className="text">
                    {props.titulo}
                    <br />
                    <b>Steve Jobs</b></p>

                {/* Email */}
                <Grid container className="Email">
                    <p className="Login">Insira seu e-mail</p>
                    <input
                        onFocus={focusEmail}
                        onBlur={blurEmail}
                        autocomplete="off"
                        type="email"
                        name="email"
                        placeholder="steve@apple.com"
                        className="EmailSenha"
                        id="EmailLogin" />
                    <p id="avisoEmail" className="Aviso">Endereço de e-mail inválido </p>
                </Grid>

                {/* Senha */}
                <Grid container className="Senha">
                    <p className="Login">Insira sua senha</p>
                    <p className="EsqSenha">Esqueceu a senha?</p>
                    <p className="Click" style={{ Color: "#000" }}>
                        <Link to='/esqueceuSenha'> Clique aqui </Link></p>
                    <input
                        onFocus={focusSenha}
                        onBlur={blurSenha}
                        type="password"
                        placeholder=" •••••••"
                        className="EmailSenha"
                        id="SenhaLogin" />
                    <p id="avisoSenha" className="Aviso">Preencha este campo</p>
                </Grid>

                <Alert severity={tipo} id='alert'>
                    <h2 id='msg'></h2>
                </Alert>

                {/*Botão de entrar*/}
                <Grid container className="Entrar">
                    <Button variant="contained" id="btn" style={{ backgroundColor: '#000' }} onClick={valid}>Entrar</Button>
                </Grid>

                <p className="ou">OU</p>

                <Facebook />
                <Twitter />

                <Link id='cadastro' to='/cadastro' style={{ marginTop: "10px" }}>Criar nova conta</Link>

            </Grid>
        </Grid>
    )
}

export default BoxWhite;