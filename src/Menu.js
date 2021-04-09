import React, { useEffect, useState }           from 'react';
import { CopyIcon, ClippyIcon, EllipsisIcon, ArrowLeftIcon, ArrowRightIcon  }  from '@primer/octicons-react';

const Menu = ({select, setSelect, csv, setCsv, undo, redo}) => {
    
    const [menu, setMenu] = useState(false);
    const [pos, setPos]   = useState([,]);
    const [OS, setOS]     = useState(null);
    
    useEffect(() => {
        
        let macOS = ['iPhone', 'iPad', 'Mac', 'iPod'];
        
        let currentOS = navigator.platform;
        
        let isMac = macOS.some(device => currentOS.includes(device));
        
        if(isMac) 
            setOS('Mac');
        
    }, []);
    
    const merge = (arr1, arr2, x, y) => {
        
        let arr1_rows = arr1.length;
        let arr2_rows = arr2.length;
        
        let arr1_cols = arr1[0].length;
        let arr2_cols = arr2[0].length;
        
        let merg_rows = Math.max(arr1_rows, arr2_rows, x + arr2_rows);
        let merg_cols = Math.max(arr1_cols, arr2_cols, y + arr2_cols);
        
        let merged = Array(merg_rows).fill('').map(e => Array(merg_cols).fill(''));
        
        for(let i = 0; i < arr1_rows; i ++){
            
            merged[i].splice(0, arr1[i].length, ...arr1[i]);
            
        }
        
        for(let i = x, j = 0; i < x + arr2_rows; i ++, j ++){    
            
            merged[i].splice(y, arr2[j].length, ...arr2[j]);
            
        }
        
        setCsv(merged);
        
    }
    
    const copy = () => {
        
        let row = select[0];
        let col = select[1];
        
        navigator.clipboard.writeText(csv[row][col]);
        
    }
    
    const paste = async () => {
        
        let clipboard = await navigator.clipboard.readText();
        
        clipboard = clipboard.split('\n').map(row => row.split('\t'));
        
        merge(csv, clipboard, select[0], select[1]); 
        
    }
    
    const addRow = () => {
        
        let temp = [...csv];
        
        let row = Array(temp[0].length).fill('');
        
        temp.splice(select[0], 0, row);
        
        setCsv(temp);
        setMenu(false);
        
        
    }
    
    const addCol = () => {
        
        let temp = [...csv];
        
        temp.forEach(row => row.splice(select[1] + 1, 0, ''));
        
        setCsv(temp);
        setMenu(false);
        
    }
    
    const deleteRows = () => {
        
        let temp = [...csv];
        
        let [iniRow, iniCol, endRow, endCol] = select;
        
        temp.splice(iniRow, endRow - iniRow + 1);
        
        setCsv(temp);
        setMenu(false);
        
    }
    
    const deleteCols = () => {
        
        let temp = [...csv];
        
        let [iniRow, iniCol, endRow, endCol] = select;
        
        temp.forEach(row => row.splice(iniCol, endCol - iniCol + 1));
        
        setCsv(temp);
        setMenu(false);
        
    }
    
    const deleteValues = () => {
        
        let temp = [...csv];
        let [iniRow, iniCol, endRow, endCol] = select;
        
        for(let i = iniRow; i <= endRow; i ++)
            for(let j = iniCol; j <= endCol; j ++)
                temp[i][j] = '';
        
        setCsv(temp);
        
    }
    
    useEffect(() => {
        
        const onDown = async (e) => {
            
            if((e.ctrlKey && e.key === 'v') || (e.metaKey && e.key === 'v')){
                
                e.preventDefault();
                
                paste();  
                
            }
            
            if((e.ctrlKey && e.key === 'ArrowRight') || (e.metaKey && e.key === 'ArrowRight')){
                
                e.preventDefault();
                
                addRow();  
                
            }
            
            if(e.key === 'Delete'){
                
                deleteValues();
                
            }
            
        }
        
        const onLeftClick = (e) => {
            
            let menu = document.getElementById('Menu');
            
            if(!menu || !menu.contains(e.target)){
                
                setMenu(false);
                
            }
            
        }
        
        const onRightClick = (e) => {
            
            let table = document.getElementById('Table');
            
            if(table.contains(e.target)){
                
                e.preventDefault();
                
                setPos({x: e.clientX, y: e.clientY + 100});
                setMenu(true);
                
                window.addEventListener('click', onLeftClick);
                
            }   
            
        }
        
        window.addEventListener('keydown',     onDown);
        window.addEventListener('contextmenu', onRightClick);
        window.addEventListener('click',       onLeftClick);
        
        return () => {
            
            window.removeEventListener('keydown',     onDown);
            window.removeEventListener('contextmenu', onRightClick);
            window.removeEventListener('click',       onLeftClick);
            
        }
        
    }, [select]);
    
    return(
        <React.Fragment>
            { menu
            ? <div className = 'Menu' style = {{position: 'absolute', top: pos.y, left: pos.x}}>
                <ul>
                    <li onClick = {copy}><CopyIcon/>Copy <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}+C</div></li>
                    <li onClick = {paste}><ClippyIcon/>Paste <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}+V</div></li>
                    <hr></hr>
                    <li onClick = {undo}><ArrowLeftIcon/>Undo <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}+Z</div></li>
                    <li onClick = {redo}><ArrowRightIcon/>Redo <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}+Shift+Z</div></li>
                    <hr></hr>
                    <li onClick = {addRow}><EllipsisIcon/>Add row <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}+→</div></li>
                    <li onClick = {addCol}><span style = {{transform: 'rotate(90deg)'}}><EllipsisIcon/></span>Add column<div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}+↓</div></li>
                    <hr></hr>
                    <li onClick = {deleteRows}>Delete row(s)</li>
                    <li onClick = {deleteCols}>Delete column(s)</li>
                </ul>  
              </div>
            : null
            }
        </React.Fragment>
    );
    
}

export default Menu;