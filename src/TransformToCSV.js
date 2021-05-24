import React              from 'react';
import { ArrowLeftIcon }  from '@primer/octicons-react';

const TransformToCSV = ({json, edit, csv, setCsv}) => {

    const getDeepKeys = (obj) => {

        let keys = Object.keys(obj).map(key => {

            if(typeof obj[key] === 'object'){

                let subkeys = getDeepKeys(obj[key]);

                return subkeys.map(subkey => key + '.' + subkey);

            }
            else{

                return key;

            }

        });

        return keys.flat(Infinity);

    }
    
    const transformToCSV = async () => {

        setCsv([
        
            ['...', '...', '...', '...', '...'],
            ['...', '...', '...', '...', '...'],
            ['...', '...', '...', '...', '...'],
            ['...', '...', '...', '...', '...'],
            
        ]);

        let keys = getDeepKeys(json);

        let firstRow = ['key', ...new Set(keys.map(key => key.split('.').slice(1).join('.')))];
        let firstCol = ['key', ...new Set(keys.map(key => key.split('.').shift()))];

        let csv = new Array(firstCol.length).fill('').map(() => new Array(firstRow.length).fill(''));

        for(let i = 0; i < firstCol.length; i ++){
            for(let j = 0; j < firstRow.length; j ++){

                if(i === 0) csv[0][j] = firstRow[j];
                if(j === 0) csv[i][0] = firstCol[i]; 
                if(i && j)  csv[i][j] = `${firstCol[i]}.${firstRow[j]}`.split('.').reduce((ref, prop) => ref = ref?.[prop], json);

            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        setCsv(csv);
        
    }
    
    return(
        <button onClick = {transformToCSV} disabled = {edit}>
            <ArrowLeftIcon/>Generate CSV
        </button>
    );
    
}

export default TransformToCSV;