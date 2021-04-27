import React                      from 'react';
import { Link }                   from 'react-router-dom';
import { ReactComponent as Logo } from './Logo.svg';


const Footer = () => {
    
    return(
        <div className = 'Footer'>
            <Logo/>
            <Link to = '/'>Home</Link>
            <Link to = '/changelog'>What's new?</Link>
            <a href = 'https://github.com/erikmartinjordan/jsonmatic'>GitHub</a>
        </div>
    );
    
}

export default Footer;