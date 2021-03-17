import React         from 'react';
import { HeartIcon } from '@primer/octicons-react';

const Subheader = () => {
    
    return(
        <div className = 'Subheader'>
            Become a sponsor and help the project <button><HeartIcon fill = "#ea4aaa"/>Sponsor</button>
        </div>
    );
    
}

export default Subheader;