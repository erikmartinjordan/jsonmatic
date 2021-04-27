import React              from 'react';
import moment             from 'moment';
import { ArrowRightIcon } from '@primer/octicons-react';
import firebase           from './Firebase';

const TransformButton = ({csv, json, setJson}) => {
    
    const addToDB = async (json) => {
        
        const today = moment().format('YYYYMMDD hh:mm:ss SSS');
        
        const db = firebase.firestore();
        
        await db.collection('json_generated').doc(today).set({result: json});   
        
    }
    
    const generateJSON = (csv) => {
        
        let json = {};
        
        csv.forEach((row, i) => {
            csv[i].forEach((column, j) => {
                
                let key        = csv[i][0];
                let value      = csv[i][j];
                let properties = csv[0][j];
                
                if(i > 0 && j > 0 && key && value){
                    
                    json[key] = json[key] || {};
                    
                    let ref = json[key];
                    let subproperties = properties.split('.');
                    let last = subproperties.pop();
                    
                    subproperties.forEach(property => {
                        
                        ref[property] = ref[property] || {};
                        ref = ref[property];
                        
                    });
                    
                    ref[last] = isNaN(value) ? value : parseFloat(value);
                    
                }
                
            })
        });
        
        return json;
        
    }
    
    const transformToJSON = async () => {
        
        let empty = {};
        
        setJson({'Generating JSON': 'Wait a few seconds...'});
        
        let firstCol = csv.map(e => e[0]);
        let firstRow = csv[0];
        
        let duplicateKeys = firstCol.some(e => empty[e] ? true : (empty[e] = true, false));
        let firstRowEmpty = firstRow.every(e => e === '');
        
        if(!duplicateKeys && !firstRowEmpty){
            
            var res = generateJSON(csv);
            
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if(duplicateKeys){
            
            setJson({'Error': 'JSON has duplicate keys'});
            
        }
        else if(firstRowEmpty){
            
            setJson({'Error': `First row shouldn't be empty`});
            
        }
        else{
            
            setJson(res);
            addToDB(res);
            
        }
        
    }
    
    return(
        <button onClick = {transformToJSON}>
            <ArrowRightIcon/>Generate JSON
        </button>
    );
    
}

export default TransformButton;