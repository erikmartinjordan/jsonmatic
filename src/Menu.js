import React, { useEffect, useState } from 'react';

const Menu = ({select, setSelect, csv, setCsv}) => {
    
    const [menu, setMenu] = useState(false);
    const [pos, setPos]   = useState([,])
    
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
    
    const deleteRow = () => {
        
        let temp = [...csv];
        
        temp.splice(select[0], 1);
        
        setCsv(temp);
        setMenu(false);
        
    }
    
    const deleteCol = () => {
        
        let temp = [...csv];
        
        temp.forEach(row => row.splice(select[1], 1));
        
        setCsv(temp);
        setMenu(false);
    }
    
    useEffect(() => {
        
        const onDown = async (e) => {
            
            if((e.ctrlKey && e.key === 'v') || (e.metaKey && e.key === 'v')){
                
                e.preventDefault();
                
                let clipboard = await navigator.clipboard.readText();
                
                clipboard = clipboard.split('\n').map(row => row.split('\t'));
                
                merge(csv, clipboard, select[0], select[1]);    
                
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
                
                setPos({x: e.clientX, y: e.clientY + 50});
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
                    <li onClick = {deleteRow}>Delete row</li>
                    <li onClick = {deleteCol}>Delete column</li>
                </ul>  
              </div>
            : null
            }
        </React.Fragment>
    );
    
}

export default Menu;