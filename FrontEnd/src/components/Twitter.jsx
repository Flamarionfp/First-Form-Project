import React from 'react';
import { Button, Grid, createMuiTheme, ThemeProvider } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';

const Twitter = () => {

    const theme = createMuiTheme({
        palette: {
            secondary: {
                main: '#55ACEE'
            }
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <Grid container className="Twitter">
                <Button variant="contained" color="secondary" endIcon={<TwitterIcon />} id="btn" >Entrar com Twitter</Button>
            </Grid>
        </ThemeProvider>
    )
}
export default Twitter;