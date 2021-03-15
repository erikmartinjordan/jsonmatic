import React, { useEffect, useState } from 'react';
import { ArrowRightIcon, ClippyIcon } from '@primer/octicons-react';
import { ReactComponent as Logo }     from './Logo.svg';
import './App.css';

const App = () => {
    
    const [table, setTable] = useState([
        
        ['key', 'road', 'coord.lat',  'coord.lng', 'elem'],
        ['1',   'AP-7', 42.02,        2.82,        'camera'],
        ['2',   'C-32', 41.35,        2.09,        'camera'],
        ['3',   'B-20', 41.44,        2.18,        'camera'],
        
    ]);
    
    const [json, setJson] = useState(
        
        {
            "1": {
                "road": "AP-7",
                "coord": {
                    "lat": 42.02,
                    "lng": 2.82
                },
                "elem": "camera"
            },
            "2": {
                "road": "C-32",
                "coord": {
                    "lat": 41.35,
                    "lng": 2.09
                },
                "elem": "camera"
            }, 
            "3": {
                "road": "B-20",
                "coord": {
                    "lat": 41.44,
                    "lng": 2.18
                },
                "elem": "camera"
            }
        }
        
    );
    
    const [select, setSelect] = useState(['', '']);
    
    const [OS, setOS] = useState(null);
    
    useEffect(() => {
        
        let macOS = ['iPhone', 'iPad', 'Mac', 'iPod'];
        
        let currentOS = navigator.platform;
        
        let isMac = macOS.some(device => currentOS.includes(device));
        
        if(isMac) 
            setOS('Mac');
        
    }, []);
    
    useEffect(() => {
        
        const onDown = async (e) => {
            
            if((e.ctrlKey && e.key === 'v') || (e.metaKey && e.key === 'v')){
                
                e.preventDefault();
                
                let text  = await navigator.clipboard.readText();
                
                let split = text.split('\n').map(row => row.split('\t'));
                
                setTable(split);
                
            }
            
        }
        
        window.addEventListener('keydown', onDown);
        
        return () => window.removeEventListener('keydown', onDown);
        
    }, []);
    
    const transformToJSON = () => {
        
        let json = {};
        
        table.forEach((row, i) => 
            table[i].forEach((column, j) => {
                
                if(i > 0 && j === 0){
                    
                    let key = table[i][j];
                    
                    json[key] = {};
                    
                }
                
                if(i > 0 && j > 0){
                    
                    let properties = table[0][j];
                    let value = table[i][j];
                    
                    let lastKey = Object.keys(json)[i - 1];
                    let ref = json[lastKey];
                    
                    let arrayProperties = properties.split('.');
                    
                    let last = arrayProperties.pop();
                    
                    arrayProperties.forEach(property => {
                        
                        ref[property] = ref[property] || {};
                        ref = ref[property];
                        
                    });
                    
                    let stringOrNumber = isNaN(value) ? value : parseFloat(value);
                    
                    ref[last] = stringOrNumber || '';
                    
                }
        }));
        
        setJson(json);
        
    }
    
    const selectBox = (row, column) => {
        
        setSelect([row, column]);
        
    }
    
    const editValue = (e, row, column) => {
        
        const copyTable = [...table];
        
        copyTable[row][column] = e.target.value;
        
        setTable(copyTable);
        
    }
    
    return (
        <div className = 'App'>
            <h1>Transform a spreadhseet into a JSON</h1>
            <p>
                1. First column is reserved for <b>unique object keys</b><br/>
                2. Use <b>dot notation</b> in the header to create subproperties
            </p>
            <div className = 'Wrap'>
                <div className = 'Table'>
                    <table>
                        <tbody>
                            {table.map((row, i) => 
                                <tr key = {i}>{table[i].map((column, j) => 
                                    <td key = {j} onClick = {() => selectBox(i, j)} className = {i === select[0] && j === select[1] ? 'Selected' : ''}>
                                        <input value = {table[i][j]} onChange = {(e) => editValue(e, i, j)}></input>
                                    </td>)}
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className = 'Hint'>💡 Press <kbd>{OS === 'Mac' ? 'cmd' : 'ctrl'}</kbd> + <kbd>V</kbd> to paste data from a spreadhseet into the table</div>
                </div>
                <button onClick = {transformToJSON}>Generate JSON<ArrowRightIcon/></button>
                <div className = 'Result'>
                    <textarea value = {JSON.stringify(json, null, 4)} readOnly = {true}/>
                    <button><ClippyIcon/>Copy JSON</button>
                </div>
            </div>
            <div className = 'Footer'>© 2021 Json, a side project from Erik Martín Jordán made in Barcelona</div>
        </div>
    );
    
}

export default App;