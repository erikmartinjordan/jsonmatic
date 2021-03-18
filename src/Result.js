import React, { useState }                           from 'react';
import IndentSelector                                from './IndentSelector';
import BeautifyButton                                from './BeautifyButton';
import UglifyButton                                  from './UglifyButton';
import { saveAs }                                    from 'file-saver';
import { ClippyIcon, CheckCircleIcon, DownloadIcon } from '@primer/octicons-react';

const Result = ({json}) => {
    
    const [alert, setAlert]   = useState(null);
    const [indent, setIndent] = useState(2);
    
    const copy = () => {
        
        navigator.clipboard.writeText(JSON.stringify(json, null, parseInt(indent)));
        
        setAlert('copied');
        
        setTimeout(() => setAlert(null), 1500);
        
    }
    
    const download = () => {
        
        var fileName = 'result.json';
        
        var fileToSave = new Blob([JSON.stringify(json, null, parseInt(indent))], {
            type: 'application/json',
            name: fileName
        });
        
        saveAs(fileToSave, fileName);
        
        setAlert('downloaded');
        
        setTimeout(() => setAlert(null), 1500);
        
    }
    
    return(
        <div className = 'Result'>
            <div className = 'Options'>
                <BeautifyButton 
                    indent    = {indent}
                    setIndent = {setIndent}
                />
                <UglifyButton
                    indent    = {indent}
                    setIndent = {setIndent}
                />
                <IndentSelector
                    indent    = {indent}
                    setIndent = {setIndent}
                />
            </div>
            <textarea value = {JSON.stringify(json, null, parseInt(indent))} readOnly = {true}/>
            <div className = 'Actions'>
                <button onClick = {copy}>    { alert !== 'copied'     ? <><ClippyIcon/>Copy JSON</>       : <><CheckCircleIcon/>Copied</>}</button>
                <button onClick = {download}>{ alert !== 'downloaded' ? <><DownloadIcon/>Download JSON</> : <><CheckCircleIcon/>Downloading</>}</button>
            </div>
        </div>
    );
    
}

export default Result;