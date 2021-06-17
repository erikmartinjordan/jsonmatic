// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Validates a CSV
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const validateCSV = (csv) => {

    let empty = {};

    let firstCol = csv.map(e => e[0]);
    let firstRow = csv[0];
    
    let duplicateKeys = firstCol.some(e => empty[e] ? true : (empty[e] = true, false));
    let firstRowEmpty = firstRow.every(e => e === '');

    if(duplicateKeys) return {error: `JSON has duplicated keys`};
    if(firstRowEmpty) return {error: `First row shouldn't be empty`};

    return `ok`;

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Validates a JSON
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const validateJSON = (json) => {

    try{

        JSON.parse(json);
        return 'ok';

    }
    catch(e){

        return {error: 'Invalid JSON'};

    }

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Transforms a JSON into a CSV
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const transformToCSV = (json) => {

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

    return csv;

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Transforms a CSV into a JSON
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const transformToJSON = (csv) => {

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Merge multiple JSONs into one
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const mergeMultipleJSONs = (jsonfiles) => {

    const union = (objA, objB) => {

        if(typeof objA === 'object'){
    
            let merged = {...objA};
    
            Object.keys(objB).forEach(key => {
    
                merged[key] = merged[key] ? union(merged[key], objB[key]) : objB[key];
    
            });
    
            return merged;
    
        }
        
        return objA;
    
    }

    let merged = jsonfiles.reduce((acc, {json}) => union(acc, json), null);

    return merged;

}

export { transformToCSV, transformToJSON, validateCSV, validateJSON, mergeMultipleJSONs }