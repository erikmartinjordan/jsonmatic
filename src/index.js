import App               from './App';
import Changelog         from './Changelog';
import MultipleReplaces  from './MultipleReplaces';
import MultipleDeletions from './MultipleDeletions';
import MultipleMerge     from './MultipleMerge';
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
            <Route exact path = '/replace'      component = {MultipleReplaces}/>
            <Route exact path = '/delete'       component = {MultipleDeletions}/>
            <Route exact path = '/merge'        component = {MultipleMerge}/>
        </Switch>
        <Footer/>
    </BrowserRouter>
, document.getElementById('root'));