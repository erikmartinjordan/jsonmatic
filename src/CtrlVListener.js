import { useEffect } from 'react';

const CtrlVListener = ({select, setSelect, setCsv}) => {
    
    useEffect(() => {
        
        const onDown = async (e) => {
            
            if((e.ctrlKey && e.key === 'v') || (e.metaKey && e.key === 'v')){
                
                if(select.every(val => val === '')){
                    
                    e.preventDefault();
                    
                    let text  = await navigator.clipboard.readText();
                    
                    let split = text.split('\n').map(row => row.split('\t'));
                    
                    setCsv(split);
                    
                }
                
            }
            
        }
        
        window.addEventListener('keydown', onDown);
        
        return () => window.removeEventListener('keydown', onDown);
        
    }, [select]);
    
    useEffect(() => {
        
        const onClick = async (e) => {
            
            if(!document.getElementById('Table').contains(e.target))
                setSelect(['', '']);
            
        }
        
        window.addEventListener('click', onClick);
        
        return () => window.removeEventListener('click', onClick);
      
    }, [select]);
    
    return null;
    
}

export default CtrlVListener;