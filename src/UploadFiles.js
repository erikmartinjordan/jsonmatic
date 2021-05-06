import React                           from 'react';
import { UploadIcon, PlusCircleIcon }  from '@primer/octicons-react';

const UploadFiles = ({jsonfiles, setJsonfiles}) => {
    
    const upload = async (e) => {
        
        let files = Array.from(e.target.files).map(file => {

            let reader = new FileReader();
                
            return new Promise(resolve => {
                
                reader.onload = () => resolve({

                    name: file.name, 
                    json: JSON.parse(reader.result)

                });

                reader.readAsText(file);
                
            });
            
        });       

        let uploaded = await Promise.all(files);
        
        setJsonfiles([...jsonfiles, ...uploaded]);
        
    }
    
    return(
        <div className = 'Multiple'>
            { jsonfiles.length === 0
            ? <React.Fragment>
                <div className = 'Upload'>
                    <UploadIcon/>Click here to upload files
                    <input onChange = {upload} type = 'file' title = '' multiple/>
                </div> 
              </React.Fragment>
            : <React.Fragment>
                <h2>Files</h2>
                <div className = 'Grid'>
                    {jsonfiles.map(({name, json}, key) => 
                        <div className = 'Block' key = {key}>
                            <div className = 'Name'>{name}</div>
                            {JSON.stringify(json, null, 2)}
                        </div>)
                    }
                    <div className = 'Upload'>
                        <PlusCircleIcon/>Add more files
                        <input onChange = {upload} type = 'file' title = '' multiple/>
                    </div> 
                </div>
              </React.Fragment>
            }
        </div>
    );
    
}

export default UploadFiles;