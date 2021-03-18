import React                from 'react';
import { TriangleDownIcon } from '@primer/octicons-react';

const IndentSelector = ({indent, setIndent}) => {
    
    return(
        <div className = 'Selector'>
            <select value = {indent} onChange = {(e) => setIndent(e.target.value)}>
                <option value = {0}>No indentation</option>
                <option value = {2}>2 spaces indent</option>
                <option value = {4}>4 spaces indent</option>
            </select>
            <TriangleDownIcon/>
        </div>
    );
    
}

export default IndentSelector;