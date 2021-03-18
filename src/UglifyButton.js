import React           from 'react';
import { FileZipIcon } from '@primer/octicons-react';

const UglifyButton = ({setIndent}) => {
    
    const uglify = () => {
        
        setIndent(0);
        
    }
    
    return(
        <button className = 'Ugly' onClick = {uglify}><FileZipIcon/>Uglify</button>
    );
    
}

export default UglifyButton;