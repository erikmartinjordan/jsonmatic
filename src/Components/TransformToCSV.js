import React                           from 'react';
import { ArrowLeftIcon, ArrowUpIcon }  from '@primer/octicons-react';
import useWindowDimensions             from '../Functions/useWindowDimensions';
import { transformToCSV }              from '../CLI/utils'; 

const TransformToCSV = ({json, edit, setCsv}) => {

    const [width] = useWindowDimensions();
    
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
            {width > 768 ? <ArrowLeftIcon/> : <ArrowUpIcon/>}Generate CSV
        </button>
    );
    
}

export default TransformToCSV;