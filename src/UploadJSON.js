import React           from 'react';
import { UploadIcon }  from '@primer/octicons-react'; 

const UploadJSON = ({edit, setJson}) => {

    const upload = (e) => {

        var reader = new FileReader();

        reader.onload = () => {

            let raw = reader.result;

            try{

                let json = JSON.parse(raw); 

                setJson(json);

            }
            catch(e){

            }

        };

        reader.readAsText(e.target.files[0]);

    }

    const simulateClick = () => document.getElementById('uploadJSON').click();

    return(
        <div className = 'UploadCSV'>
            <button disabled = {edit} onClick = {simulateClick}><UploadIcon/> Upload JSON</button>
            <input onChange = {upload} id = 'uploadJSON' type = 'file'/>
        </div>
    );

}

export default UploadJSON;