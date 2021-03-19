import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App                                    from './App';

test('Paste CSV displays table correctly', async () => {
    
    let csv = [
        
        ['key', 'road', 'coord.lat',  'coord.lng', 'elem'],
        ['1',   'C-58', 42.02,        2.82,        '🦄'],
        ['2',   'C-32', 41.35,        2.09,        '🦧'],
        ['3',   'B-20', 41.44,        2.18,        '🐰']
      
    ].map(e => e.join(`\t`)).join(`\n`);
    
    Object.assign(navigator, {
        clipboard: {
            readText: () => csv
        }
    });
    
    await render(<App />);
    
    document.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "v",
            ctrlKey: true,
            bubbles: true,
            metaKey: true   
        })
    );
    
    await waitFor(() => expect(screen.getByDisplayValue('C-58')).toBeInTheDocument()); 
    
    
});

test('Duplicate key displays an error', async () => {
    
    let csv = [
        
        ['key', 'road', 'coord.lat',  'coord.lng', 'elem'],
        ['1',   'C-58', 42.02,        2.82,        '🦄'],
        ['1',   'C-32', 41.35,        2.09,        '🦧'],
        ['3',   'B-20', 41.44,        2.18,        '🐰']
      
    ].map(e => e.join(`\t`)).join(`\n`);
    
    Object.assign(navigator, {
        clipboard: {
            readText: () => csv
        }
    });
    
    await render(<App />);
    
    document.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "v",
            ctrlKey: true,
            bubbles: true,
            metaKey: true   
        })
    );
    
    await waitFor(() => expect(screen.getByDisplayValue('C-58')).toBeInTheDocument()); 
    
    fireEvent.click(screen.getByText('Generate JSON'));
    
    await waitFor(() => expect(screen.getByText('JSON has duplicate keys', {exact: false})).toBeInTheDocument()); 
    
});

test('Transforms a CSV into a JSON correctly', async () => {
    
    let csv = [
        
        ['key', 'road', 'coord.lat',  'coord.lng', 'elem'],
        ['1',   'AP-7', 42.02,        2.82,        '🦄'],
        ['2',   'C-32', 41.35,        2.09,        '🦧']
        
    ].map(e => e.join(`\t`)).join(`\n`);
    
    let json = {
        
        "1": {
            "road": "AP-7",
            "coord": {
                "lat": 42.02,
                "lng": 2.82
            },
            "elem": "🦄"
        },
        "2": {
            "road": "C-32",
            "coord": {
                "lat": 41.35,
                "lng": 2.09
            },
            "elem": "🦧"
        }
        
    };
    
    Object.assign(navigator, {
        clipboard: {
            readText: () => csv
        }
    });
    
    await render(<App />);
    
    document.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: "v",
            ctrlKey: true,
            bubbles: true,
            metaKey: true   
        })
    );
    
    await waitFor(() => expect(screen.getByDisplayValue('AP-7')).toBeInTheDocument()); 
    
    fireEvent.click(screen.getByText('Generate JSON'));
    
    await waitFor(() => expect(screen.getByText('Wait a few seconds...', {exact: false})).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Uglify'));
    
    await waitFor(() => expect(screen.getByText(JSON.stringify(json), {exact: false})).toBeInTheDocument());
    
});