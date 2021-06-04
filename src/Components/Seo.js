import { useEffect }  from 'react';
import { withRouter } from 'react-router-dom';

const Seo = () => {

    let sitemap = {

        '/': {
            'title': `Jsonmatic`,
            'description': `Transform a CSV (spreadsheet) into a JSON.`
        },
        '/changelog': {
            'title': `What's new — Jsonmatic`,
            'description': `Changelog and relevant changes of the website.`
        },
        '/replace': {
            'title': `Replace — Jsonmatic`,
            'description': `Replace a property from multiple JSON files at once, and download the new file.`
        },
        '/merge': {
            'title': `Merge — Jsonmatic`,
            'description': `Merge multiple JSON files, and download the new merged file.`
        },
        '/delete': {
            'title': `Delete — Jsonmatic`,
            'description': `Replace a property from multiple JSON files at once, and download the new file.`
        }

    }

    useEffect(() => {

        let url = window.location.pathname;
        
        document.title = sitemap[url].title; 
        document.querySelector(`meta[name = 'description']`).content = sitemap[url].description; 
        
    });

    return null;

}

export default withRouter(Seo);