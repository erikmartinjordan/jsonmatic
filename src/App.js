import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
    
    const [table, setTable] = useState([
        
        ['key', 'road', 'coord.lat',  'coord.lng',   'elem'],
        ['1',   'AP-7', '42.02',      '2.82',        'camera'],
        ['2',   'B-20', '41.44',      '2.18',        'camera'],
        ['3',   'C-32', '41.35',      '2.09',        'camera'],
        
    ]);
    
    const [json, setJson] = useState(
        
        `{
            "1": {
                "road": "AP-7",
                "coord": {
                    "lat": 42.02,
                    "lng": 2.82
                }
                "elem": "camera"
            },
            "2": {
                "road": "C-32",
                "coord": {
                    "lat": 41.35,
                    "lng": 2.09
                }
                "elem": "camera"
            }, 
            "3", {
                "road": "B-20",
                "coord": {
                    "lat": 41.44,
                    "lng": 2.18
                }
                "elem": "camera"
            }
        }`
    
    );
    
    useEffect(() => {
        
        const onDown = async (e) => {
            
            if(e.ctrlKey && e.key === 'v'){
                
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
                    
                    let property = table[0][j];
                    let value    = table[i][j];
                    
                    json[i][property] = value;
                    
                }
            
        }));
        
        console.log(json);
        
        setJson(json);
        
    }
    
    return (
        <div className = 'App'>
            <div className = 'Table'>
                <h2>Copy and paste Excel data into the table:</h2>
                <table>
                    <tbody>
                        {table.map((row, i) => 
                            <tr>{table[i].map((column, j) => 
                                <td>{table[i][j]}</td>)}
                            </tr>
                        )}
                    </tbody>
                </table>
                <button onClick = {transformToJSON}>Generate JSON</button>
            </div>
            <div className = 'Result'>
                <textarea value = {json}/>
            </div>
        </div>
    );
    
}

export default App;