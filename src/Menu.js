import React, { useEffect, useState }                                          from 'react';
import { CopyIcon, ClippyIcon, EllipsisIcon, ArrowLeftIcon, ArrowRightIcon  }  from '@primer/octicons-react';

const Menu = ({select, setSelect, csv, setCsv, undo, redo}) => {
    
    const [menu, setMenu] = useState(false);
    const [pos, setPos]   = useState({x: 0, y: 0});
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
        
        let text = '';
        
        let [iniRow, iniCol, endRow, endCol] = select;
        
        for(let i = iniRow; i <= endRow; i ++){
            for(let j = iniCol; j <= endCol; j ++){
                
                text += csv[i][j];
                
                if(j !== endCol) 
                    text += '\t';
                
            }
            
            if(i !== endRow) 
                text += '\n';
            
        }
        
        navigator.clipboard.writeText(text);
        
    }
    
    const paste = async () => {
        
        let clipboard = await navigator.clipboard.readText();
        
        clipboard = clipboard.split('\n').map(row => row.split('\t'));
        
        merge(csv, clipboard, select[0], select[1]); 
        
    }
    
    const addRow = () => {
        
        let temp = JSON.parse(JSON.stringify(csv));
        
        let row = Array(temp[0].length).fill('');
        
        temp.splice(select[0] + 1, 0, row);
        
        setCsv(temp);
        setMenu(false);
        
    }
    
    const addCol = () => {
        
        let temp = JSON.parse(JSON.stringify(csv));
        
        temp.forEach(row => row.splice(select[1] + 1, 0, ''));
        
        setCsv(temp);
        setMenu(false);
        
    }
    
    const deleteRows = () => {
        
        let temp = JSON.parse(JSON.stringify(csv));
        
        let [iniRow, iniCol, endRow, endCol] = select; // eslint-disable-line no-unused-vars
        
        temp.splice(iniRow, endRow - iniRow + 1);
        
        setCsv(temp);
        setMenu(false);
        
    }
    
    const deleteCols = () => {
        
        let temp = JSON.parse(JSON.stringify(csv));
        
        let [iniRow, iniCol, endRow, endCol] = select; // eslint-disable-line no-unused-vars
        
        temp.forEach(row => row.splice(iniCol, endCol - iniCol + 1));
        
        setCsv(temp);
        setMenu(false);
        
    }
    
    const deleteValues = () => {
        
        let temp = JSON.parse(JSON.stringify(csv));
        
        let [iniRow, iniCol, endRow, endCol] = select;
        
        for(let i = iniRow; i <= endRow; i ++)
            for(let j = iniCol; j <= endCol; j ++)
                temp[i][j] = '';
        
        setCsv(temp);
        
    }
    
    const moveSelection = (direction) => {
        
        let temp = [...select];
        
        let [iniRow, iniCol, endRow, endCol] = temp;
        
        let cols = csv[0].length;
        let rows = csv.length;
        
        if(temp.every(el => el === '') || iniRow !== endRow || iniCol !== endCol){
            
            setSelect([0, 0, 0, 0]);
            return;
        }
        
        switch(direction){
            
            case 'ArrowRight': temp[1] = temp[3] = Math.min(cols - 1, temp[1] + 1); break;
            case 'ArrowLeft':  temp[1] = temp[3] = Math.max(0,        temp[1] - 1); break;   
            case 'ArrowDown':  temp[0] = temp[2] = Math.min(rows - 1, temp[2] + 1); break; 
            case 'ArrowUp':    temp[0] = temp[2] = Math.max(0,        temp[2] - 1); break; 
            default: break;
            
        }
        
        setSelect(temp);
        
    }
    
    const selectAll = () => {
        
        let cols = csv[0].length;
        let rows = csv.length;
        
        setSelect([0, 0, rows - 1, cols - 1]);
        
    }

    const focus = () => {

        let [iniRow, iniCol] = select;

        let ref = document.getElementById(`input${iniRow}${iniCol}`);

        if(ref) 
            ref.focus();

    }
    
    useEffect(() => {
        
        const onDown = async (e) => {
            
            if((e.ctrlKey && e.key === 'v') || (e.metaKey && e.key === 'v')){
                
                e.preventDefault();
                
                paste();  
                
            }
            
            if((e.ctrlKey && e.key === 'a') || (e.metaKey && e.key === 'a')){
                
                e.preventDefault();
                
                selectAll();  
                
            }
            
            if(e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown'){
                
                e.preventDefault();
                
                moveSelection(e.key);  
                
            }
            
            if((e.ctrlKey && e.key === 'c') || (e.metaKey && e.key === 'c')){
                
                e.preventDefault();
                
                copy();  
                
            }
            
            if((e.ctrlKey && e.key === 'ArrowRight') || (e.metaKey && e.key === 'ArrowRight')){
                
                e.preventDefault();
                
                addCol();  
                
            }
            
            if((e.ctrlKey && e.key === 'ArrowDown') || (e.metaKey && e.key === 'ArrowDown')){
                
                e.preventDefault();
                
                addRow();  
                
            }
            
            if((e.ctrlKey && e.key === 'ArrowLeft') || (e.metaKey && e.key === 'ArrowLeft')){
                
                e.preventDefault();
                
                deleteCols();  
                
            }
            
            if((e.ctrlKey && e.key === 'ArrowUp') || (e.metaKey && e.key === 'ArrowUp')){
                
                e.preventDefault();
                
                deleteRows();  
                
            }
            
            if(e.key === 'Delete'){
                
                deleteValues();
                
            }

            if(e.key.length === 1){

                focus();

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
                
                setPos({x: e.pageX, y: e.pageY});
                setMenu(true);
                
                window.addEventListener('click', onLeftClick);
                
            }   
            
        }

        if(select.some(el => el !== '')){

            window.addEventListener('keydown',     onDown);
            window.addEventListener('contextmenu', onRightClick);
            window.addEventListener('click',       onLeftClick);

        }
        
        return () => {
            
            window.removeEventListener('keydown',     onDown);
            window.removeEventListener('contextmenu', onRightClick);
            window.removeEventListener('click',       onLeftClick);
            
        }
        
    }, [csv, select]); // eslint-disable-line react-hooks/exhaustive-deps
    
    return(
        <React.Fragment>
            { menu
            ? <div className = 'Menu' style = {{position: 'absolute', top: pos.y, left: pos.x}}>
                <ul>
                    <li onClick = {copy}><CopyIcon/>Copy <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}C</div></li>
                    <li onClick = {paste}><ClippyIcon/>Paste <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}V</div></li>
                    <hr></hr>
                    <li onClick = {undo}><ArrowLeftIcon/>Undo <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}Z</div></li>
                    <li onClick = {redo}><ArrowRightIcon/>Redo <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}⇧Z</div></li>
                    <hr></hr>
                    <li onClick = {addRow}><EllipsisIcon/>Add row <div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}↓</div></li>
                    <li onClick = {addCol}><span style = {{transform: 'rotate(90deg)'}}><EllipsisIcon/></span>Add column<div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}→</div></li>
                    <hr></hr>
                    <li onClick = {deleteRows}><span style = {{color: 'rgb(235, 87, 87)'}}>Delete row(s)</span><div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}↑</div></li>
                    <li onClick = {deleteCols}><span style = {{color: 'rgb(235, 87, 87)'}}>Delete column(s)</span><div className = 'Hint'>{OS === 'Mac' ? '⌘' : 'ctrl'}←</div></li>
                </ul>  
              </div>
            : null
            }
        </React.Fragment>
    );
    
}

export default Menu;