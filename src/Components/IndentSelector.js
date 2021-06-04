import React                from 'react';
import { TriangleDownIcon } from '@primer/octicons-react';

const IndentSelector = ({edit, indent, setIndent}) => {    
    
    return(
        <div className = 'Selector'>
            <select disabled = {edit} value = {indent} onChange = {(e) => setIndent(parseInt(e.target.value))}>
                <option value = {0}>No indentation</option>
                <option value = {2}>2 spaces indent</option>
                <option value = {4}>4 spaces indent</option>
            </select>
            <TriangleDownIcon/>
        </div>
    );
    
}

export default IndentSelector;