import React, { useState }             from 'react';
import { saveAs }                      from 'file-saver';
import { DownloadIcon, UploadIcon }    from '@primer/octicons-react';


const MultipleReplaces = () => {
    
    const [jsonfiles,    setJsonfiles]    = useState([]);
    const [numReplaces,  setNumReplaces]  = useState(0);
    const [path,         setPath]         = useState('');
    const [replaceValue, setReplaceValue] = useState('');
    const [currentValue, setCurrentValue] = useState('');
    
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

        let jsons = await Promise.all(files);
        
        setJsonfiles(jsons);
        
    }
    
    const replace = () => {

        let numReplaces = 0;
        
        let jsonFilesReplaced = jsonfiles.map(({name, json}) => {
            
            let clone = {...json};
            
            let props = path.split('.');
            
            let val = props.slice(0    ).reduce((ref, prop) => ref = ref?.[prop], clone);
            let ref = props.slice(0, -1).reduce((ref, prop) => ref = ref?.[prop], clone);
            
            let last = props.pop();

            let _currentValue = isNaN(currentValue) ? currentValue : parseFloat(currentValue);
            let _replaceValue = isNaN(replaceValue) ? replaceValue : parseFloat(replaceValue);
            
            if(_currentValue === val){

                ref[last] = _replaceValue;
                numReplaces ++;

            }
        
            return {
                name: name,
                json: clone
            };
            
        });

        setJsonfiles(jsonFilesReplaced);
        setNumReplaces(numReplaces);
        
    }
    
    const download = () => {

        jsonfiles.forEach(({name, json}) => {

            let fileName = name;

            let fileToSave = new Blob([JSON.stringify(json, null, 2)], {
                type: 'application/json',
                name: fileName
            });
            
            saveAs(fileToSave, fileName);

        });       

    }
    
    return(
        <div className = 'Multiple'>
            { jsonfiles.length === 0
            ? <React.Fragment>
                <h2>Replace multiple properties in JSON files at once</h2>
                <p>Select your files (they won't be uploaded to any server), they remain in your browser.</p>
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
                            {JSON.stringify(json, null, 2)}
                        </div>)
                    }
                </div>
                <h2>Rules</h2>
                <div className = 'Replace'>
                    <span>If</span>
                    <input placeholder = 'property.subproperty' onChange = {e => setPath(e.target.value)} value = {path}/>
                    <span>is equal to</span>
                    <input placeholder = 'value' onChange = {e => setCurrentValue(e.target.value)} value = {currentValue}/>
                    <span>replace with</span>
                    <input placeholder = 'new value' onChange = {e => setReplaceValue(e.target.value)} value = {replaceValue}/>
                </div>
                <div className = 'Actions'>
                    <button onClick = {replace}>{numReplaces ? `Replaced ${numReplaces} fields` : `Replace`}</button>
                    <button onClick = {download}><DownloadIcon/>Download all files</button>                                        
                </div>
              </React.Fragment>
            }
        </div>
    );
    
}

export default MultipleReplaces;