import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Button, createMuiTheme, ThemeProvider, Grid } from '@material-ui/core';

const Facebook = () => {

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#3B5998'
            }
        }
    })
    return (
        <ThemeProvider theme={theme}>
            <Grid container className="Facebook">
                <Button Theme variant="contained" color="primary" endIcon={<FacebookIcon />} id="btn">Entrar com Facebook</Button>
            </Grid>
        </ThemeProvider>
    )
}

export default Facebook;