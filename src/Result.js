import React, { useState }             from 'react';
import { ClippyIcon, CheckCircleIcon } from '@primer/octicons-react';

const Result = ({json}) => {
    
    const [alert, setAlert] = useState(null);
    
    const copyJSON = () => {
        
        navigator.clipboard.writeText(JSON.stringify(json, null, 4));
        
        setAlert('copied');
        
        setTimeout(() => setAlert(null), 1500);
        
    }
    
    return(
        <div className = 'Result'>
            <textarea value = {JSON.stringify(json, null, 4)} readOnly = {true}/>
            <button onClick = {copyJSON}>
                { alert !== 'copied' 
                ? <><ClippyIcon/>Copy JSON</>
                : <><CheckCircleIcon/>Copied</>
                }
            </button>
        </div>
    );
    
}

export default Result;