import React                      from 'react';
import { ReactComponent as Logo } from './Logo.svg';

const Header = () => {
    
    return(
        <div className = 'Header'>
            <Logo/>
            <h1>jsonmatic – transform a CSV into a JSON</h1>
            <p>First column is reserved for <b>unique object keys</b>. You can use <b>dot notation</b> in the header cells to create subproperties.</p>
            <p>Made by <a href = 'https://erikmartinjordan.com'><u>Erik Martín Jordán</u></a>, see it on <a href = 'https://github.com/erikmartinjordan/spreadsheet-json'>GitHub</a></p>
        </div>
    );
    
}

export default Header;