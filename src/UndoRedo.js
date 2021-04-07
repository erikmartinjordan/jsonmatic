import React, { useEffect, useState } from 'react';

const UndoRedo = ({csv, setCsv, bufferSize}) => {
    
    const [buffer, setBuffer] = useState([]);
    const [index,  setIndex]  = useState(-1);
    
    console.log(buffer);
    console.log(index);
    
    const undo = () => {
        
        let pos = index - 1;
        
        if(pos < 0)
            pos = -1;
        
        setIndex(pos);
        setCsv(buffer[pos]);
        
    }
    
    useEffect(() => {
        
        let deepCopyCsv = JSON.parse(JSON.stringify(csv));
        let deepCopyBuf = JSON.parse(JSON.stringify(buffer));
        
        deepCopyBuf.push(deepCopyCsv);
        deepCopyBuf.slice(-bufferSize);
        
        let pos = index + 1;
        
        if(pos >= bufferSize - 1)
            pos = bufferSize - 1;
        
        setBuffer(deepCopyBuf);
        setIndex(pos);
        
    }, [csv]);
    
    useEffect(() => {
        
        const onDown = (e) => {
            
            if((e.ctrlKey && e.key === 'z') || (e.metaKey && e.key === 'z')){
                
                e.preventDefault();
                
                undo();
                
            }
            
        }
        
        window.addEventListener('keydown', onDown);
        
        return () => window.removeEventListener('keydown', onDown);        
        
    }, [buffer]);  
    
    
    return null;    
    
}

export default UndoRedo;