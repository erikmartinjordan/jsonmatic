import { useState, useEffect } from 'react';

const useUndoableState = (csv) => {
    
    const [buffer, setBuffer] = useState([csv]);
    const [index, setIndex]   = useState(0);
    const maxBufferSize       = 10;
    
    const undo = () => {
        
        let pos = index - 1;
        
        if(pos < 0)
            pos = 0;
        
        setIndex(pos);
        
    }
    
    const redo = () => {
        
        let pos = index + 1;
        
        if(pos > buffer.length - 1)
            pos = buffer.length - 1;
        
        setIndex(pos);
        
    }
    
    const setCsv = (csv) => {
        
        let copyBuffer = JSON.parse(JSON.stringify(buffer));
        let copyCsv    = JSON.parse(JSON.stringify(csv));
        let pos        = index + 1;
        
        if(pos > maxBufferSize - 1)
            pos = maxBufferSize - 1;
        
        copyBuffer.splice(pos, copyBuffer.length - pos, copyCsv);
        
        setBuffer(copyBuffer);
        setIndex(pos);
        
    }

    useEffect(() => {
        
        const onDown = (e) => {
            
            if((e.ctrlKey && e.key === 'z') || (e.metaKey && e.key === 'z')){
                
                e.preventDefault();
                
                undo();
                
            }
            
            if((e.ctrlKey && e.shiftKey && e.key === 'z') || (e.metaKey && e.shiftKey && e.key === 'z')){
                
                e.preventDefault();
                
                redo();
                
            }
            
        }
        
        window.addEventListener('keydown', onDown);
        
        return () => window.removeEventListener('keydown', onDown);
        
        
    }, [buffer, index]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return [buffer[index], setCsv, undo, redo];
    
}

export default useUndoableState;