import React, { useEffect, useState } from 'react';

const Table = ({csv, setCsv}) => {
    
    const [OS, setOS]         = useState(null);
    const [select, setSelect] = useState(['', '']);
    
    useEffect(() => {
        
        let macOS = ['iPhone', 'iPad', 'Mac', 'iPod'];
        
        let currentOS = navigator.platform;
        
        let isMac = macOS.some(device => currentOS.includes(device));
        
        if(isMac) 
            setOS('Mac');
        
    }, []);
    
    const selectBox = (row, column) => {
        
        setSelect([row, column]);
        
    }
    
    const editValue = (e, row, column) => {
        
        const copyCsv = [...csv];
        
        copyCsv[row][column] = e.target.value;
        
        setCsv(copyCsv);
        
    }
    
    return(
        <div className = 'Table'>
            <table>
                <tbody>
                    {csv.map((row, i) => 
                        <tr key = {i}>{csv[i].map((column, j) => 
                            <td key = {j} onClick = {() => selectBox(i, j)} className = {i === select[0] && j === select[1] ? 'Selected' : ''}>
                                <input value = {csv[i][j]} onChange = {(e) => editValue(e, i, j)}></input>
                            </td>)}
                        </tr>
                    )}
                </tbody>
            </table>
            <div className = 'Hint'>
                Press <kbd>{OS === 'Mac' ? 'cmd' : 'ctrl'}</kbd> + <kbd>v</kbd> to paste data from a spreadhseet into the table
            </div>
        </div>
    );
    
}

export default Table;