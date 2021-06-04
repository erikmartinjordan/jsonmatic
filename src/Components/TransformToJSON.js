import React                            from 'react';
import { ArrowRightIcon }               from '@primer/octicons-react';
import { transformToJSON, validateCSV } from '../Functions/utils'; 


const TransformToJSON = ({csv, setJson}) => {
    
    const transform = async () => {
        
        setJson({'Generating JSON': 'Wait a few seconds...'});

        await new Promise(resolve => setTimeout(resolve, 1000));

        let validation = validateCSV(csv);
        
        if(validation === 'ok'){

            setJson(transformToJSON(csv));
            
        }
        else{
            
            setJson({'Error': validation.error});
            
        }

        
    }
    
    return(
        <button onClick = {transform}>
            <ArrowRightIcon/>Generate JSON
        </button>
    );
    
}

export default TransformToJSON;