import React, { useState }               from 'react';
import { saveAs }                        from 'file-saver';
import { DownloadIcon, CheckCircleIcon } from '@primer/octicons-react';

const DownloadJSON = ({json, edit, indent}) => {

    const [alert, setAlert] = useState(null);

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
        <button disabled = {edit} onClick = {download}>{ alert !== 'downloaded' ? <><DownloadIcon/>Download JSON</> : <><CheckCircleIcon/>Downloading</>}</button>
    );

}

export default DownloadJSON;