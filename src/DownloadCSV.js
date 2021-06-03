import React, { useState }               from 'react';
import { saveAs }                        from 'file-saver';
import { DownloadIcon, CheckCircleIcon } from '@primer/octicons-react';

const DownloadCSV = ({csv}) => {

    const [alert, setAlert] = useState(null);

    const download = () => {
        
        var fileName = 'result.csv';
        
        var fileToSave = new Blob([csv.map(row => row.join(',')).join('\n')], {
            type: 'application/csv',
            name: fileName
        });
        
        saveAs(fileToSave, fileName);
        
        setAlert('downloaded');
        
        setTimeout(() => setAlert(null), 1500);
        
    }

    return(
        <button onClick = {download}>{ alert !== 'downloaded' ? <><DownloadIcon/>Download CSV</> : <><CheckCircleIcon/>Downloading</>}</button>
    );

}

export default DownloadCSV;