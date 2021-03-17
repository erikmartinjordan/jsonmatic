import React, { useEffect } from 'react';

const CtrlVListener = ({setCsv}) => {
    
    useEffect(() => {
        
        const onDown = async (e) => {
            
            if((e.ctrlKey && e.key === 'v') || (e.metaKey && e.key === 'v')){
                
                e.preventDefault();
                
                let text  = await navigator.clipboard.readText();
                
                let split = text.split('\n').map(row => row.split('\t'));
                
                setCsv(split);
                
            }
            
        }
        
        window.addEventListener('keydown', onDown);
        
        return () => window.removeEventListener('keydown', onDown);
        
    }, []);
    
    return null;
    
}

export default CtrlVListener;