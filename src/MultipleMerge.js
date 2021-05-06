import React, { useState }                         from 'react';
import { saveAs }                                  from 'file-saver';
import UploadFiles                                 from './UploadFiles';
import { DownloadIcon, GrabberIcon, GitMergeIcon } from '@primer/octicons-react';

const MultipleReplaces = () => {
    
    const [jsonfiles, setJsonfiles] = useState([]);
    const [dragged,   setDragged]   = useState(null);
    const [merged,    setMerged]    = useState(null);
    
    const merge = () => {

        const union = (objA, objB) => {

            if(typeof objA === 'object'){
        
                let merged = {...objA};
        
                Object.keys(objB).forEach(key => {
        
                    merged[key] = merged[key] ? union(merged[key], objB[key]) : objB[key];
        
                });
        
                return merged;
        
            }
            
            return objA;
        
        }

        let merged = jsonfiles.reduce((acc, {json}) => union(acc, json), null);

        setMerged(merged);

    }

    const download = () => {

        let fileName = `merged.json`;
    
        let fileToSave = new Blob([JSON.stringify(merged, null, 2)], {
            type: 'application/json',
            name: fileName
        });
            
        saveAs(fileToSave, fileName);       
    
    }

    const handleDragStart = (e) => {

        setDragged(e.target.id);

    }

    const handleDragOver = (e) => {

        let newPosition = parseInt(e.target.id);
    
        if(newPosition >= 0){
    
            let copy = [...jsonfiles];
    
            ((from, to, elem) => {
    
                copy.splice(from, 1);
                copy.splice(to, 0, elem);
    
            })(dragged, newPosition, jsonfiles[dragged]);
    
            setJsonfiles(copy);
            setDragged(newPosition);
    
        }
    
    }

    const handleDragEnd = () => {

        setDragged(null);

    }

    return(
        <div className = 'Multiple'>
            <h2>Merge multiple JSON files</h2>
            <p>Select your files (they won't be uploaded to any server), they remain in your browser.</p>
            <UploadFiles
                jsonfiles    = {jsonfiles}
                setJsonfiles = {setJsonfiles}
            />
            { jsonfiles.length > 0
            ? <React.Fragment>
                <h2>Select merge order</h2>
                <p>Higher priority files are on the left. Files with higher priority overwrite them with less priority:</p>
                <div className = 'DragAndDrop'>
                    {jsonfiles.map(({name}, key) => 
                        <React.Fragment key = {key}>
                            <div className = 'Element' id = {key} draggable = {true} onDragStart = {handleDragStart} onDragOver = {handleDragOver} onDragEnd = {handleDragEnd}>{name}<GrabberIcon/></div>
                        </React.Fragment>
                    )}
                    <button onClick = {merge} disabled = {false}><GitMergeIcon/>Merge all files</button>
                </div>
                { merged
                ? <div className = 'Result'>
                    <div className = 'Block'>
                        <div className = 'Name'>merged.json</div>
                        {JSON.stringify(merged, null, 2)}
                    </div>
                    <button onClick = {download}><DownloadIcon/>Download</button>
                </div>
                : null
                }
              </React.Fragment>
            : null
            }
        </div>
    );
    
}

export default MultipleReplaces;