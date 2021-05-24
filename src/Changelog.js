import React, { useEffect, useState } from 'react';
import ReactMarkdown                  from 'react-markdown';
import changelog                      from './changelog.md';

const Changelog = () => {
    
    const [markdown, setMarkdown] = useState(null);
    
    useEffect(() => {
        
        const fetchMarkdown = async () => {
            
            let res  = await fetch(changelog);
            let text = await res.text();
            
            setMarkdown(text);
            
        }
        
        fetchMarkdown();
        
    }, []);
    
    return(
        <div className = 'Changelog'>
            <h1>What's new?</h1>
            <ReactMarkdown 
                children   = {markdown}
                components = {{
                    img: ({src}) => <img alt = 'Changelog' loading = 'lazy' src = {src}></img>
                }}
            />
        </div>
    );
    
}

export default Changelog;