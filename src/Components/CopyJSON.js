import React, { useState }             from 'react';
import { ClippyIcon, CheckCircleIcon } from '@primer/octicons-react';

const CopyCSV = ({edit, json, indent}) => {

    const [alert, setAlert] = useState(null);

    const copy = () => {
        
        navigator.clipboard.writeText(JSON.stringify(json, null, parseInt(indent)));
        
        setAlert('copied');
        
        setTimeout(() => setAlert(null), 1500);
        
    }

    return(
        <button disabled = {edit} onClick = {copy}>{ alert !== 'copied' ? <><ClippyIcon/>Copy JSON</> : <><CheckCircleIcon/>Copied</>}</button>
    );

}

export default CopyCSV;