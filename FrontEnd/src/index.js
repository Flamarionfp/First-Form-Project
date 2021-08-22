import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route } from 'react-router-dom'

import PageCadastro from './components/PageCadastro'
import PageSenha from './components/PageSenha'
import Imagem from './components/Imagem'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> 
    <Route path='/' exact={true} component={App}  />
    <Route path='/cadastro' component={PageCadastro} />
    <Route path='/esqueceuSenha' component={PageSenha} />
    <Route path='/imagem' component={Imagem} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
