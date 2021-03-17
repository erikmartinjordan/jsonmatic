import React         from 'react';
import { HeartIcon } from '@primer/octicons-react';

const Subheader = () => {
    
    return(
        <div className = 'Subheader'>
            Become a sponsor and help the project <button onClick = {() => window.location.href = 'https://github.com/erikmartinjordan/jsonmatic'}><HeartIcon fill = "#ea4aaa"/>Sponsor</button>
        </div>
    );
    
}

export default Subheader;