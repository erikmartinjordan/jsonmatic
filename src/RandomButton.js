import React           from 'react';
import dream           from 'dreamjs';
import { FlameIcon }   from '@primer/octicons-react';

const RandomButton = ({edit, setJson}) => {
    
    const randomize = () => {

        let people = ~~(Math.random() * 100);
        
        dream
        .schema({
            name: 'name',
            age: 'age',
            address: 'address',
            contact: {
                phone: 'phone',
                servicePhone: /^(800[1-9]{6})$/
            }
        })
        .generateRnd(people)
        .output((err, result) => {

            let json = {};

            result.forEach((obj, i) => json[i] = obj)
            
            setJson(json);

        });
    
    }
    
    return(
        <button disabled = {edit} className = 'Random' onClick = {randomize}><FlameIcon/>Randomize</button>
    );
    
}

export default RandomButton;