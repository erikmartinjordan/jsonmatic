import React           from 'react';
import { UploadIcon }  from '@primer/octicons-react'; 

const UploadCSV = ({setCsv}) => {

    const upload = (e) => {

        var reader = new FileReader();

        reader.onload = () => {

            let raw = reader.result;

            let csv = raw.split(/\r\n|\n|\r/).map(line => line.split(',')); 

            setCsv(csv);

        };

        reader.readAsText(e.target.files[0]);

    }

    const simulateClick = () => document.getElementById('uploadCSV').click();

    return(
        <div className = 'UploadCSV'>
            <button onClick = {simulateClick}><UploadIcon/> Upload CSV</button>
            <input onChange = {upload} id = 'uploadCSV' type = 'file'/>
        </div>
    );

}

export default UploadCSV;