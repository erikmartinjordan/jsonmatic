import React              from 'react';
import { ArrowLeftIcon }  from '@primer/octicons-react';
import { transformToCSV } from '../Functions/utils'; 

const TransformToCSV = ({json, edit, setCsv}) => {
    
    const transform = async () => {

        setCsv([
        
            ['...', '...', '...', '...', '...'],
            ['...', '...', '...', '...', '...'],
            ['...', '...', '...', '...', '...'],
            ['...', '...', '...', '...', '...'],
            
        ]);

        await new Promise(resolve => setTimeout(resolve, 1000));

        setCsv(transformToCSV(json));
        
    }
    
    return(
        <button onClick = {transform} disabled = {edit}>
            <ArrowLeftIcon/>Generate CSV
        </button>
    );
    
}

export default TransformToCSV;