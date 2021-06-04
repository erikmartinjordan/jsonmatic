import React              from 'react';
import { ArrowLeftIcon }  from '@primer/octicons-react';

const TransformToCSV = ({json, edit, csv, setCsv}) => {

    const getDeepKeys = (obj) => {

        let keys = Object.keys(obj).map(key => {

            if(typeof obj[key] === 'object'){

                let subkeys = getDeepKeys(obj[key]);

                return subkeys.map(subkey => key + '__separator__' + subkey);

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

        let firstRow = ['key', ...new Set(keys.map(key => key.split('__separator__').slice(1).join('__separator__')))];
        let firstCol = ['key', ...new Set(keys.map(key => key.split('__separator__').shift()))];

        let csv = new Array(firstCol.length).fill('').map(() => new Array(firstRow.length).fill(''));

        for(let i = 0; i < firstCol.length; i ++){
            for(let j = 0; j < firstRow.length; j ++){

                if(i === 0) csv[0][j] = firstRow[j].split('__separator__').join('.');
                if(j === 0) csv[i][0] = firstCol[i].split('__separator__').join('.'); 
                if(i && j)  csv[i][j] = `${firstCol[i]}__separator__${firstRow[j]}`.split('__separator__').reduce((ref, prop) => ref = ref?.[prop], json);

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