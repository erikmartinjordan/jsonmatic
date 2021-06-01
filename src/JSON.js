import React, {  useState }                          from 'react';
import IndentSelector                                from './IndentSelector';
import BeautifyButton                                from './BeautifyButton';
import UglifyButton                                  from './UglifyButton';
import RandomButton                                  from './RandomButton';
import TextareaIndent                                from './TextareaIndent';
import { saveAs }                                    from 'file-saver';
import { ClippyIcon, CheckCircleIcon, DownloadIcon } from '@primer/octicons-react';

const Json = ({edit, json, setEdit, setJson}) => {
    
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
                <RandomButton
                    edit      = {edit}
                    setJson   = {setJson}
                />
                <BeautifyButton 
                    edit      = {edit}
                    indent    = {indent}
                    setIndent = {setIndent}
                />
                <UglifyButton
                    edit      = {edit}
                    indent    = {indent}
                    setIndent = {setIndent}
                />
                <IndentSelector
                    edit      = {edit}
                    indent    = {indent}
                    setIndent = {setIndent}
                />
            </div>
            <TextareaIndent
                edit     = {edit}
                setEdit  = {setEdit}
                indent   = {indent}
                json     = {json}
                setJson  = {setJson}
            />
            <div className = 'Actions'>
                <button disabled = {edit} onClick = {copy}>    { alert !== 'copied'     ? <><ClippyIcon/>Copy JSON</>       : <><CheckCircleIcon/>Copied</>}</button>
                <button disabled = {edit} onClick = {download}>{ alert !== 'downloaded' ? <><DownloadIcon/>Download JSON</> : <><CheckCircleIcon/>Downloading</>}</button>
            </div>
        </div>
    );
    
}

export default Json;