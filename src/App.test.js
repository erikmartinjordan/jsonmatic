import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { configure }                          from '@testing-library/dom';
import App                                    from './App';
import firebase, { environment }              from './Firebase';

configure({ asyncUtilTimeout: 5000 });

beforeEach(() => {
    
    jest.spyOn(firebase, 'firestore').mockImplementation(() => ({
        
        collection:   jest.fn().mockReturnThis(),
        doc:          jest.fn().mockReturnThis(),
        set:          jest.fn().mockReturnThis()
        
    }));
    
});

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
    
    fireEvent.click(screen.getByDisplayValue('key'));
    
    await waitFor(() => expect(document.getElementById('00')).toHaveClass('Selected'));
    
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
    
    fireEvent.click(screen.getByDisplayValue('key'));
    
    await waitFor(() => expect(document.getElementById('00')).toHaveClass('Selected'));
    
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
    
    await waitFor(() => expect(screen.getByText('JSON has duplicated keys', {exact: false})).toBeInTheDocument()); 
    
});

test('Transforms a CSV into a JSON correctly', async () => {
    
    let csv = [
        
        ['key', 'road', 'coord.lat',  'coord.lng', 'elem'],
        ['1',   'AP-7', 42.02,        2.82,        '🦄'],
        ['2',   'C-32', 41.35,        2.09,        '🦧'],
        ['3',   'B-20', 41.44,        2.18,        '🐰'],
        ['4',   'AP-7', 41.42,        2.10,        '🦊']
        
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
        },
        "3": {
            "road": "B-20",
            "coord": {
                "lat": 41.44,
                "lng": 2.18
            },
            "elem": "🐰"
        }
        ,
        "4": {
            "road": "AP-7",
            "coord": {
                "lat": 41.42,
                "lng": 2.10
            },
            "elem": "🦊"
        }
        
    };
    
    Object.assign(navigator, {
        clipboard: {
            readText: () => csv
        }
    });
    
    await render(<App />);
    
    fireEvent.click(screen.getByDisplayValue('key'));
    
    await waitFor(() => expect(document.getElementById('00')).toHaveClass('Selected'));
    
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

test('Copies JSON into the clipboard', async () => {
    
    let csv = [
        
        ['key', 'road', 'coord.lat',  'coord.lng', 'elem'],
        ['1',   'AP-7', 42.02,        2.82,        '🦄'],
        ['2',   'C-32', 41.35,        2.09,        '🦧'],
        ['3',   'B-20', 41.44,        2.18,        '🐰'],
        ['4',   'AP-7', 41.42,        2.10,        '🦊']
        
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
        },
        "3": {
            "road": "B-20",
            "coord": {
                "lat": 41.44,
                "lng": 2.18
            },
            "elem": "🐰"
        }
        ,
        "4": {
            "road": "AP-7",
            "coord": {
                "lat": 41.42,
                "lng": 2.10
            },
            "elem": "🦊"
        }
        
    };
    
    Object.assign(navigator, {
        clipboard: {
            readText: ()  => csv,
            writeText: () => json
        }
    });
    
    await render(<App />);
    
    fireEvent.click(screen.getByDisplayValue('key'));
    
    await waitFor(() => expect(document.getElementById('00')).toHaveClass('Selected'));
    
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
    
    fireEvent.click(screen.getByText('Copy JSON'));
    
    await waitFor(() => expect(screen.getByText('Copied', {exact: false})).toBeInTheDocument());
    
});

test('Downloads the file', async () => {
    
    window.URL.createObjectURL = jest.fn();
    
    await render(<App />);
    
    fireEvent.click(screen.getByText('Download JSON'));
    
    await waitFor(() => expect(screen.getByText('Downloading', {exact: false})).toBeInTheDocument());
    
});

test('App is in PRO', async () => {
    
    expect(environment).toBe('PRO');
    
});