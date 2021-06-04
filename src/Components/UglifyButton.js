import React           from 'react';
import { FileZipIcon } from '@primer/octicons-react';

const UglifyButton = ({edit, setIndent}) => {
    
    const uglify = () => {
        
        setIndent(0);
        
    }
    
    return(
        <button disabled = {edit} className = 'Ugly' onClick = {uglify}><FileZipIcon/>Uglify</button>
    );
    
}

export default UglifyButton;