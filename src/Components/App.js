import React, { useState }  from 'react';
import Header               from './Header';
import Json                 from './Json';
import Csv                  from './Csv';
import TransformToJSON      from './TransformToJSON';
import TransformToCSV       from './TransformToCSV';
import Menu                 from './Menu';
import useUndoableState     from '../Functions/useUndoableState';

const App = () => {
    
    const [csv, setCsv, undo, redo] = useUndoableState([
        
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
                "elem": "🦄"
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
    
    const [select, setSelect] = useState(['', '', '', '']);
    const [edit, setEdit]     = useState(false);
    
    return (
        <div className = 'App'>
            <Header/>
            <div className = 'Content'>
                <Csv 
                    csv       = {csv}
                    setCsv    = {setCsv}
                    select    = {select}
                    setSelect = {setSelect}
                />
                <div className = 'Buttons'>
                    <TransformToJSON
                        csv     = {csv}
                        json    = {json} 
                        setJson = {setJson}    
                    />
                    <TransformToCSV
                        json    = {json} 
                        csv     = {csv}
                        edit    = {edit}
                        setCsv  = {setCsv}    
                    />
                </div>
                <Json
                    edit    = {edit} 
                    json    = {json}
                    setEdit = {setEdit}
                    setJson = {setJson}
                />
            </div>
            <Menu
                csv         = {csv}
                setCsv      = {setCsv}
                select      = {select}
                setSelect   = {setSelect}   
                undo        = {undo}
                redo        = {redo}
            />
        </div>
    );
    
}

export default App;