import React, { useState, useCallback } from 'react';
import { Grid, Button } from '@material-ui/core';
import LogoApple from '../images/apple.png';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Alert from '@material-ui/lab/Alert';
import { useDropzone } from 'react-dropzone'

const PageCadastro = () => {

    const [tipoCadastro, setTipoCadastro] = useState('')

    const [estadoBotao, setEstadoBotao] = useState('')

    const [selectedFileUrl, setSelectedFileUrl] = useState(''); // estado da imagem
    const [base64, setBase64] = useState(null); // base64

    // Upload da imagem
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];  // a partir desse file, criamos a url do arquivo
        const fileUrl = URL.createObjectURL(file) // criado a url com o createObjectURL, ele joga para a variavel fileUrl, então se set essa url com o estado criado acima
        setSelectedFileUrl(fileUrl) //preview da imagem

        const reader = new FileReader();
        reader.onload = () => {
            setBase64(reader.result);
        }

        reader.readAsDataURL(file)
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' })

    // ---- Validações 
    const validarEmail = () => {
        //  console.log(validarEmail)
        const aparecerEmail = document.getElementById('avisoEmail')
        const salvarBtn = document.getElementById('btnCadastro')

        fetch('/validarEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                emailCadastro: document.getElementById('EmailLogin').value
            })
        }).then(response => response.json()).then(json => {
            var trocaValidarEmail = json.validMensagem;
            if (json.emailLivre === 1) {
                trocaValidarEmail = 'Este email já existe!';
                document.getElementById('avisoEmail').innerHTML = trocaValidarEmail;
                aparecerEmail.style.color = '#F55448'
                aparecerEmail.style.display = "block";
                setEstadoBotao('disable')
                salvarBtn.style.opacity = '0.4'
            } else {
                aparecerEmail.style.display = 'none'
                setEstadoBotao('')
                salvarBtn.style.opacity = '1'
            }
        })
    }

    const valid = () => {

        // Nome
        const nome = document.getElementById('cadastroNome').value
        //document.write(nome)
        const aparecerNome = document.getElementById('avisoNome')

        // CPF
        const cpf = document.getElementById('cadastroCPF').value
        //document.write(cpf)
        const aparecerCPF = document.getElementById('avisoCPF')

        // Email
        const email = document.getElementById('EmailLogin').value
        const aparecerEmail = document.getElementById('avisoEmail')

        //Senha
        const senha = document.getElementById('SenhaLogin').value
        const aparecerSenhaNum = document.getElementById('avisoSenhaNum') // 6 ou + caracteres
        const senhaIgual = document.getElementById('SenhaLoginIgual').value // senhas iguais
        const avisoSenhaIgual = document.getElementById('avisoSenhaIgual')

        // Telefone
        const phone = document.getElementById('telefone').value
        //document.write(phone)
        const aparecerPhone = document.getElementById('avisoTelefone')

        // Alerta
        const alertCadastro = document.getElementById('alertCadastro')

        // Condição Nome
        if (nome.length < 3) {
            aparecerNome.style.display = "block"
        } else {
            aparecerNome.style.display = "none"
        }

        // Condição CPF
        var contadorCPF = 0;

        for (var i = 0; i < 14; i++) {
            if (isNaN(cpf[i])) { //função NaN (Not a Number)
                //não é numero entra aqui 
            } else {
                //se é numero entra aqui
                contadorCPF++; //contador vai mostrar quantos numeros tem na string
            }
        }
        //document.write(contadorCPF); //contador deve imprimir 11 nesse exemplo

        if (contadorCPF < 11) {
            aparecerCPF.style.display = "block"
        } else {
            aparecerCPF.style.display = "none"
        }

        // Condição Email
        if (!email.includes('@') || !email.includes('.') || email.length === 0) {
            aparecerEmail.style.display = "block"
        } else {
            aparecerEmail.style.display = "none"

            fetch('/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: document.getElementById('cadastroNome').value.toLowerCase(),
                    cpf: document.getElementById('cadastroCPF').value,
                    emailCadastro: document.getElementById('EmailLogin').value.toLowerCase(),
                    senhaCadastro: document.getElementById('SenhaLogin').value,
                    telefone: document.getElementById('telefone').value,
                    // imagemBase: baseImage
                })
            }).then(response => response.json()).then(json => {
                var cadastroGeral = json.pMsg;

                if (json.cadastrado === 1) {
                    cadastroGeral = 'Cadastrado com sucesso!'
                    document.getElementById('mensagemCadastro').innerHTML = cadastroGeral
                    setTipoCadastro('success')
                    setEstadoBotao('disable')
                    alertCadastro.style.display = 'inline-flex'
                }
            })
        }

        // Condição Senha
        if (senha.length < 6) {
            aparecerSenhaNum.style.display = "block"
        } else {
            aparecerSenhaNum.style.display = "none"
        }

        if (senha !== senhaIgual) {
            avisoSenhaIgual.style.display = "block"
        } else {
            avisoSenhaIgual.style.display = "none"
        }

        // Condição Telefone
        var contadorTelefone = 0;

        for (var i = 0; i < 15; i++) {
            if (isNaN(phone[i])) { //função NaN (Not a Number)
                //não é numero entra aqui 
            } else {
                //se é numero entra aqui
                contadorTelefone++; //contador vai mostrar quantos numeros tem na string
            }
        }
        // document.write(phone)
        // document.write(contadorTelefone)
        if (contadorTelefone < 11) {
            aparecerPhone.style.display = "block"
        } else {
            aparecerPhone.style.display = "none"
        }
    }

    // ---- Manipulação input
    // Focus
    const focusNome = () => {
        const nome = document.getElementById('cadastroNome')
        nome.style.borderColor = '#737088'
    }

    const focusCPF = () => {
        const cpf = document.getElementById('cadastroCPF')
        cpf.style.borderColor = '#737088'
    }

    const focusEmail = () => {
        const email = document.getElementById('EmailLogin')
        email.style.borderColor = '#737088'
    }

    const focusSenha = () => {
        const senha = document.getElementById('SenhaLogin')
        senha.style.borderColor = '#737088'
    }

    const focusSenhaConf = () => {
        const senhaIgual = document.getElementById('SenhaLoginIgual')
        senhaIgual.style.borderColor = '#737088'
    }

    const focusTelefone = () => {
        const phone = document.getElementById('telefone')
        phone.style.borderColor = '#737088'
    }

    // Blur 
    const blurNome = () => {
        const nome = document.getElementById('cadastroNome')
        if (nome.value.length === 0) {
            nome.style.borderColor = '#ff0000'
        }
    }

    const blurCPF = () => {
        const cpf = document.getElementById('cadastroCPF')
        if (cpf.value.length === 0) {
            cpf.style.borderColor = '#ff0000'
        }
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

    const blurSenhaConf = () => {
        const senhaIgual = document.getElementById('SenhaLoginIgual')
        if (senhaIgual.value.length === 0) {
            senhaIgual.style.borderColor = '#ff0000'
        }
    }

    const blurTelefone = () => {
        const phone = document.getElementById('telefone')
        if (phone.value.length === 0) {
            phone.style.borderColor = '#ff0000'
        }
    }

    return (
        <Grid className='PageCadastro' container justify="center"
            style={{
                minHeight: "500px",
                maxWidth: "420px",
            }}>


            <Grid container justify="center">
                <img className="Apple" src={LogoApple} alt='img' />
                <p className="text" id='dados'>Insira seus Dados Pessoais</p>
            </Grid>

            {/* Imagem de perfil */}
            <Grid container justify="center">
                <div className='upload' {...getRootProps()} accept="image/*" >
                    <input  {...getInputProps()} />
                    {selectedFileUrl // existe um valor no selectedFileUrl ?
                        ? <img src={selectedFileUrl} alt="" /> // se existe, mostre a imagem aqui
                        : <p id='imgPerfil'>Carregar imagem </p> // se não, mostre o paragrafo
                    }
                </div>
            </Grid>

            {/* Nome */}
            <Grid container>
                <p className="Login">Nome</p>
                <input
                    onFocus={focusNome}
                    onBlur={blurNome}
                    type="text"
                    name="nome"
                    placeholder="Kristine Muller"
                    className="EmailSenha"
                    id="cadastroNome" />
                <p id="avisoNome" className="Aviso">Nome inválido</p>
            </Grid>

            {/* CPF */}
            <Grid container>
                <p className="Login" >CPF</p>
                <InputMask
                    onFocus={focusCPF}
                    onBlur={blurCPF}
                    mask="999.999.999-99"
                    placeholder="987.009.746-20"
                    className="EmailSenha"
                    id="cadastroCPF" />
                <p id="avisoCPF" className="Aviso">CPF inválido</p>
            </Grid>

            {/* Email */}
            <Grid container>
                <p className="Login">Email</p>
                <input
                    onChange={validarEmail}
                    onFocus={focusEmail}
                    onBlur={blurEmail}
                    autocomplete="off"
                    type="email"
                    name="email"
                    placeholder="kristine.muller@lighthouse.com.br"
                    className="EmailSenha"
                    id="EmailLogin" />
                <p id="avisoEmail" className="Aviso">E-mail indisponível ou inválido  </p>
            </Grid>

            {/* Senha */}
            <Grid container>
                <p className="Login">Senha</p>
                <input
                    onFocus={focusSenha}
                    onBlur={blurSenha}
                    type="password"
                    placeholder=" •••••••••"
                    className="EmailSenha"
                    id="SenhaLogin" />
                <p id="avisoSenhaNum" className="Aviso">Use seis ou mais caracteres</p>
            </Grid>

            {/* Confirmação de senha */}
            <Grid container style={{ marginTop: '-10px' }}>
                <p className="Login">Confirmar senha</p>
                <input
                    onFocus={focusSenhaConf}
                    onBlur={blurSenhaConf}
                    type="password"
                    placeholder=" •••••••••"
                    className="EmailSenha"
                    id="SenhaLoginIgual" />
                <p id="avisoSenhaIgual" className="Aviso">As senhas não são iguais. Tente novamente.</p>
            </Grid>

            {/* Telefone */}
            <Grid container>
                <p className="Login" style={{ marginTop: "-1px" }}>Telefone</p>
                <InputMask
                    onFocus={focusTelefone}
                    onBlur={blurTelefone}
                    mask="(99) 99999-9999"
                    placeholder="(51) 98555-5562"
                    className="EmailSenha"
                    id="telefone" />
                <p id="avisoTelefone" className="Aviso">Número incorreto</p>
            </Grid>

            {/* Alerta */}
            <Alert
                id='alertCadastro'
                severity={tipoCadastro}
            >
                <p id='mensagemCadastro' />
            </Alert>

            {/* Botão de salvar */}
            <Grid container>
                <Button
                    disabled={estadoBotao}
                    onClick={valid}
                    variant="contained"
                    id="btnCadastro"
                    style={{
                        backgroundColor: '#000',
                        marginTop: "20px"
                    }}>Salvar</Button>
            </Grid>

            {/* Voltar */}
            <Link id='voltar' to='/'>Voltar</Link>

        </Grid>
    )
}
export default PageCadastro;