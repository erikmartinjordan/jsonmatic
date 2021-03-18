import React          from 'react';
import { SmileyIcon } from '@primer/octicons-react';

const BeautifyButton = ({indent, setIndent}) => {
    
    const beautify = () => {
        
        if(!indent)
            setIndent(2);
        
    }
    
    return(
        <button className = 'Beauty' onClick = {beautify}><SmileyIcon/>Beautify</button>
    );
    
}

export default BeautifyButton;