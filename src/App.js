import React, { useState }  from 'react';
import Subheader            from './Subheader';
import Header               from './Header';
import Result               from './Result';
import Table                from './Table';
import TransformButton      from './TransformButton';
import Menu                 from './Menu';
import Analytics            from './Analytics';
import './App.css';

const App = () => {
    
    const [csv, setCsv] = useState([
        
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
    
    const [select, setSelect] = useState([0, 0]);
    
    return (
        <div className = 'App'>
            <Subheader/>
            <Header/>
            <div className = 'Content'>
                <Table 
                    csv       = {csv}
                    setCsv    = {setCsv}
                    select    = {select}
                    setSelect = {setSelect}
                />
                <TransformButton
                    csv     = {csv}
                    json    = {json} 
                    setJson = {setJson}    
                />
                <Result 
                    json    = {json}
                />
            </div>
            <Menu
                csv         = {csv}
                setCsv      = {setCsv}
                select      = {select}
                setSelect   = {setSelect}    
            />
            <Analytics/>
        </div>
    );
    
}

export default App;