import React, { useState }             from 'react';
import { ClippyIcon, CheckCircleIcon } from '@primer/octicons-react';

const CopyCSV = ({csv}) => {

    const [alert, setAlert] = useState(null);

    const copy = () => {
        
        let text = csv.join('\n').split(',').join('\t');
        
        navigator.clipboard.writeText(text);

        setAlert('copied');
        
        setTimeout(() => setAlert(null), 1500);
        
    }

    return(
        <button onClick = {copy}>{ alert !== 'copied' ? <><ClippyIcon/>Copy CSV</> : <><CheckCircleIcon/>Copied</>}</button>
    );

}

export default CopyCSV;