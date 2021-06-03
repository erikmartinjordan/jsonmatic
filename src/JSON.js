import React, {  useState }                          from 'react';
import IndentSelector                                from './IndentSelector';
import BeautifyButton                                from './BeautifyButton';
import UglifyButton                                  from './UglifyButton';
import RandomButton                                  from './RandomButton';
import TextareaIndent                                from './TextareaIndent';
import UploadJSON                                    from './UploadJSON';
import CopyJSON                                      from './CopyJSON';
import DownloadJSON                                  from './DownloadJSON';

const Json = ({edit, json, setEdit, setJson}) => {
    
    const [alert, setAlert]   = useState(null);
    const [indent, setIndent] = useState(2);
    
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
                <CopyJSON       
                    json   = {json} 
                    indent = {indent}
                    edit   = {edit}
                />
                <UploadJSON     
                    setJson = {setJson} 
                    edit    = {edit}
                />
                <DownloadJSON   
                    json    = {json} 
                    indent  = {indent}
                    edit    = {edit}
                />
            </div>
        </div>
    );
    
}

export default Json;