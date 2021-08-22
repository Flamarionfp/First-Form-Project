import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Imagem = () => {

    const [colocarImagem, setColocarImagem] = useState('')

    const pegarImagem = () => {
        fetch('/imagem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                emailImagem: document.getElementById('emailImage').value
            })
        }).then(response => response.json())
            .then(json => {
                setColocarImagem(json.msg);
                console.log(json.msg)
            });
    }

    return (
        <Grid className='PageCadastro' container justify="center"
            style={{
                minHeight: "150px",
                maxWidth: "420px",
            }}>

            <p className="Login">Digite o seu e-mail</p>
            <input
                autocomplete="off"
                type="email"
                name="email"
                placeholder="kristine.muller@lighthouse.com.br"
                className="EmailSenha"
                id="emailImage"
            />

            <img src={colocarImagem} height='200px' id='customimage' />
            <Button onClick={pegarImagem} id='btnImage' style={{ backgroundColor: "#000" }} >Mostrar imagem </Button>

            <Link to='/'>Voltar</Link>

        </Grid>
    )
}
export default Imagem