import React             from 'react';
import ReactDOM          from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import App               from './Components/App';
import Changelog         from './Components/Changelog';
import MultipleReplaces  from './Components/MultipleReplaces';
import MultipleDeletions from './Components/MultipleDeletions';
import MultipleMerge     from './Components/MultipleMerge';
import Footer            from './Components/Footer';
import Seo               from './Components/Seo';
import './Styles/index.css';

ReactDOM.render(
    <BrowserRouter>
        <Seo/>
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