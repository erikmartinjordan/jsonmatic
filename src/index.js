import App               from './App';
import Changelog         from './Changelog';
import Footer            from './Footer';
import React             from 'react';
import ReactDOM          from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path = '/'             component = {App}/>
            <Route exact path = '/changelog'    component = {Changelog}/>
        </Switch>
        <Footer/>
    </BrowserRouter>
, document.getElementById('root'));