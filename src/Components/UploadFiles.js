import React, { useEffect, useState }  from 'react';
import { UploadIcon, PlusCircleIcon }  from '@primer/octicons-react';

const UploadFiles = ({jsonfiles, setJsonfiles}) => {

    const [OS, setOS] = useState(null);
    
    useEffect(() => {
        
        let macOS = ['iPhone', 'iPad', 'Mac', 'iPod'];
        
        let currentOS = navigator.platform;
        
        let isMac = macOS.some(device => currentOS.includes(device));
        
        if(isMac) 
            setOS('Mac');

        const onDown = async (e) => {
        
            if((e.ctrlKey && e.key === 'u') || (e.metaKey && e.key === 'u')){
                
                e.preventDefault();
                
                document.getElementById('upload').click();
                
            }
            
        }

        window.addEventListener('keydown', onDown);

        
        return () => {
            
            window.removeEventListener('keydown', onDown);
            
        }
        
    }, []);
    
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
                    <div>
                        <UploadIcon/>Click here to upload files
                        <input onChange = {upload} id = 'upload' type = 'file' title = '' multiple/>
                    </div>
                    <div className = 'Hint'>Or press {OS === 'Mac' ? '⌘' : 'ctrl'}U</div>
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