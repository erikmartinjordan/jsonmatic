import React, { useState }                 from 'react';
import { saveAs }                          from 'file-saver';
import UploadFiles                         from './UploadFiles';
import { DownloadIcon,  TriangleDownIcon } from '@primer/octicons-react';

const MultipleReplaces = () => {
    
    const [jsonfiles,    setJsonfiles]    = useState([]);
    const [numDeletions, setNumdeletions] = useState(null);
    const [operation,    setOperation]    = useState('equal');
    const [path,         setPath]         = useState('');
    const [currentValue, setCurrentValue] = useState('');
    
    const deletion = () => {

        let numDeletions = 0;
        
        let jsonFilesReplaced = jsonfiles.map(({name, json}) => {

            let clone = {...json};
            
            let res = path.split(',').map(path => {

                let props = path.trim().split('.');
            
                let val = props.slice(0    ).reduce((ref, prop) => ref = ref?.[prop], clone);
                let ref = props.slice(0, -1).reduce((ref, prop) => ref = ref?.[prop], clone);
                
                let last = props.pop();
    
                let _currentValue = isNaN(currentValue) ? currentValue : parseFloat(currentValue);
    
                let rule = {
    
                    'equal':   () => val === _currentValue,
                    'greater': () => val  >  _currentValue,
                    'lesser':  () => val  <  _currentValue
    
                }[operation]();
                
                if(rule || _currentValue === '*'){
                    
                    try{

                        delete ref[last];
                        numDeletions ++;

                    }catch(e){

                        // Ignore deletion because property doesn't exist

                    }
    
                }

            });

            return {
                name: name,
                json: clone
            };
            
        });


        setJsonfiles(jsonFilesReplaced);
        setNumdeletions(numDeletions);
        
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
            <h2>Delete multiple properties in JSON files at once</h2>
            <p>Select your files (they won't be uploaded to any server), they remain in your browser.</p>
            <UploadFiles
                jsonfiles    = {jsonfiles}
                setJsonfiles = {setJsonfiles}
            />
            { jsonfiles.length > 0
            ? <React.Fragment>
                <h2>Rules</h2>
                <div className = 'Replace'>
                    <span>If</span>
                    <input placeholder = 'property.subproperty' onChange = {e => setPath(e.target.value)} value = {path}/>
                    <div className = 'Selector'>
                        <select value = {operation} onChange = {(e) => setOperation(e.target.value)}>
                            <option value = 'equal'>is equal to</option>
                            <option value = 'greater'>is greater than</option>
                            <option value = 'greater'>is lesser than</option>
                        </select>
                        <TriangleDownIcon/>
                    </div>
                    <input placeholder = 'value' onChange = {e => setCurrentValue(e.target.value)} value = {currentValue}/>
                </div>
                <div className = 'Hint'>
                    <p style = {{fontSize: '12px', marginBottom: '20px', fontStyle: 'italic'}}>Hint: Separate multiple properties with commas and set value to * for brute force deletion</p>
                </div>
                <div className = 'Actions'>
                    <button onClick = {deletion}  disabled = {!path || !currentValue}>Delete</button>
                    <button onClick = {download} disabled = {false}><DownloadIcon/>Download all files</button>  
                </div>
                <div className = 'Alerts'>
                    <div>{numDeletions !== null ? `${numDeletions} fields deleted` : null}</div>                                      
                </div>
              </React.Fragment>
            : null
            }
        </div>
    );
    
}

export default MultipleReplaces;