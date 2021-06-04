import React, { useEffect, useState } from 'react';
import UploadCSV                      from './UploadCSV';
import CopyCSV                        from './CopyCSV';
import DownloadCSV                    from './DownloadCSV';

const Csv = ({csv, setCsv, select, setSelect}) => {
    
    const [drag, setDrag]     = useState(false);
    const [resize, setResize] = useState(false);
    
    useEffect(() => {
        
        const onClick = async (e) => {
            
            let ref = document.getElementById('Table');
            
            if(ref && !ref.contains(e.target))
                setSelect(['', '', '', '']);
            
        }
        
        window.addEventListener('click', onClick);
        
        return () => window.removeEventListener('click', onClick);
      
    }, [select, setSelect]);

    useEffect(() => {

        let [iniRow, iniCol, endRow, endCol] = select;

        let ref = document.getElementById(`input${iniRow}${iniCol}`);

        if(ref) 
            ref.focus();

        if(iniRow !== endRow || iniCol !== endCol)
            ref.blur();

    }, [select]);
    
    const selectBox = (row, col) => {
        
        setSelect([row, col, row, col]);
        
    }
    
    const handleMouseDown = (e, row, col) => {
        
        let [iniRow, iniCol, endRow, endCol] = select;
        
        if(e.button === 0){
            
            setSelect([row, col, row, col]);
            
            setDrag(true);
            
        }
        if(e.button === 2 && iniRow === endRow && iniCol === endCol){
            
            setSelect([row, col, row, col]);
            
        }
        
    }
    
    const handleMouseUp = () => {
        
        setDrag(false);
        
    }
    
    const handleMultipleSel = (e, row, col) => {
        
        if(drag){

            e.preventDefault();
            
            let [iniRow, iniCol, endRow, endCol] = select;
            
            if(iniRow <= row && iniCol <= col)
                setSelect([iniRow, iniCol, row, col]);
            
            if(iniRow >= row && iniCol >= col)
                setSelect([row, col, endRow, endCol])
            
        }
        
    }
    
    const editValue = (e, row, col) => {
        
        const copyCsv = JSON.parse(JSON.stringify(csv));
        
        copyCsv[row][col] = e.target.value;
        
        setCsv(copyCsv);
        
    }
    
    const getClassName = (row, col) => {
        
        let [iniRow, iniCol, endRow, endCol] = select;
        
        if(select.every(el => el === ''))                                             
            return '';
        
        if(row >= iniRow && row <= endRow && col >= iniCol && col <= endCol) 
            return 'Selected';
        
    }

    const resizeColumn = (e, col) => {

        e.preventDefault();

        if(resize.col === col && e.clientX){

            let elem = document.getElementById(`input0${col}`);

            elem.style.width = `${Math.max(75, parseInt(resize.initialSize) + parseInt(e.clientX - resize.initialPos))}px`;

        }

    }

    const autoResizeColumn = (e, col) => {

        let longestRow = csv.reduce((acc, elem, row) => csv[acc][col].toString().length > csv[row][col].toString().length ? acc : row, 0);

        csv.forEach((_, row) => document.getElementById(`input${row}${col}`).style.width = csv[longestRow][col].toString().length + 0.5 + 'ch');

    }

    const handleMouseDownDragger = (e, col) => {

        e.stopPropagation();

        let elem = document.getElementById(`input0${col}`);

        setResize({
            col: col,
            initialPos: e.clientX,
            initialSize: elem.offsetWidth
        });

    }

    const handleMouseUpDragger = (e) => {

        setResize(false);

    }
    
    return(
        <div className = 'Csv'>
            <div className = 'Table' id = 'Table'>
                <table>
                    <tbody>
                        {csv.map((row, i) => 
                            <tr key = {i}>{csv[i].map((column, j) => 
                                <td key           = {j}
                                    id            = {`${i}${j}`}
                                    onClick       = {(e) => selectBox(i, j)}
                                    onMouseDown   = {(e) => handleMouseDown(e, i, j)}
                                    onMouseUp     = {(e) => handleMouseUp(e, i, j)}
                                    onMouseMove   = {(e) => handleMultipleSel(e, i, j)}
                                    className     = {getClassName(i, j)}>
                                        <input 
                                            id       = {`input${i}${j}`}
                                            value    = {csv[i][j]} 
                                            onChange = {(e) => editValue(e, i, j)}>
                                        </input>
                                        <div 
                                            className     = 'Dragger' 
                                            draggable     = {true}
                                            id            = {j} 
                                            onMouseDown   = {(e) => handleMouseDownDragger(e, j)}
                                            onMouseUp     = {(e) => handleMouseUpDragger(e)}
                                            onDrag        = {(e) => resizeColumn(e, j)}
                                            onDoubleClick = {(e) => autoResizeColumn(e, j)}>
                                        </div>
                                </td>)}
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className = 'Actions'>
                <CopyCSV     
                    csv = {csv}
                />
                <UploadCSV   
                    setCsv = {setCsv}
                />
                <DownloadCSV 
                    csv = {csv}
                />
            </div>
        </div>
    );
    
}

export default Csv;