import React, { useEffect, useState }                  from 'react';
import { ArrowRightIcon, ClippyIcon, CheckCircleIcon } from '@primer/octicons-react';
import { ReactComponent as Logo }                      from './Logo.svg';
import './App.css';

const App = () => {
    
    const [table, setTable] = useState([
        
        ['key', 'road', 'coord.lat',  'coord.lng', 'elem'],
        ['1',   'AP-7', 42.02,        2.82,        '🦄'],
        ['2',   'C-32', 41.35,        2.09,        '🦧'],
        ['3',   'B-20', 41.44,        2.18,        '🐰'],
        
    ]);
    
    const [json, setJson] = useState(
        
        {
            "1": {
                "road": "AP-7",
                "coord": {
                    "lat": 42.02,
                    "lng": 2.82
                },
                "elem": "🦄'"
            },
            "2": {
                "road": "C-32",
                "coord": {
                    "lat": 41.35,
                    "lng": 2.09
                },
                "elem": "🦧"
            }, 
            "3": {
                "road": "B-20",
                "coord": {
                    "lat": 41.44,
                    "lng": 2.18
                },
                "elem": "🐰"
            }
        }
        
    );
    
    const [alert, setAlert] = useState(null);
    
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
    
    const transformToJSON = async () => {
        
        let start = Date.now();
        
        let json = {};
        
        setJson({'Generating JSON': 'Wait a few seconds...'});
        
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
        
        let end = Date.now();
        
        console.log(end - start);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
    
    const copyJSON = () => {
        
        navigator.clipboard.writeText(JSON.stringify(json, null, 4));
        
        setAlert('copied');
        
        setTimeout(() => setAlert(null), 1500);
        
    }
    
    return (
        <div className = 'App'>
            <div className = 'Header'>
                <Logo/>
                <h1>jsoner – transform a spreadhseet into a JSON</h1>
                <p>First column is reserved for <b>unique object keys</b>. You can use <b>dot notation</b> in the header cells to create subproperties.</p>
                <p>Made by <a href = 'https://erikmartinjordan.com'><u>Erik Martín Jordán</u></a></p>
            </div>
            <div className = 'Content'>
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
                    <div className = 'Hint'>
                        Press <kbd>{OS === 'Mac' ? 'cmd' : 'ctrl'}</kbd> + <kbd>v</kbd> to paste data from a spreadhseet into the table
                    </div>
                </div>
                <button onClick = {transformToJSON}>
                    <ArrowRightIcon/>Generate JSON
                </button>
                <div className = 'Result'>
                    <textarea value = {JSON.stringify(json, null, 4)} readOnly = {true}/>
                    <button onClick = {copyJSON}>
                        { alert !== 'copied' 
                        ? <React.Fragment><ClippyIcon/>Copy JSON</React.Fragment>
                        : <React.Fragment><CheckCircleIcon/>Copied</React.Fragment>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
    
}

export default App;