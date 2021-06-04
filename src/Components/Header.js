import React                      from 'react';
import { ReactComponent as Logo } from '../Assets/Logo.svg';

const Header = () => {
    
    return(
        <div className = 'Header'>
            <Logo/>
            <h1>jsonmatic – transform a CSV into a JSON</h1>
            <p>First column is reserved for <b>unique object keys</b>. You can use <b>dot notation</b> in the header cells to create subproperties.</p>
        </div>
    );
    
}

export default Header;