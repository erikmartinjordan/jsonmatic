import React, { useEffect, useState } from 'react';

const TextareaIndent = ({edit, setEdit, indent, json, setJson}) => {

    const [alert, setAlert] = useState(null);
    const [text, setText]   = useState({value: '', caret: -1, target: null});

    useEffect(() => {

        setText({value: JSON.stringify(json, null, parseInt(indent))});

    }, [json, indent]);

    useEffect(() => {

        if(text.caret >= 0){

            text.target.setSelectionRange(text.caret + indent, text.caret + indent);

        }

    }, [text]);

    const iniEdition = () => {
        
        setEdit(true);
        setAlert(null);

    }

    const endEdition = () => {

        try{

            setJson(JSON.parse(text.value));
            setEdit(false);

        }
        catch(e){

            setAlert('Invalid JSON');

        }

    }

    const handleTab = (e) => {

        let content = e.target.value;
        let caret   = e.target.selectionStart;

        if(e.key === 'Tab'){

            e.preventDefault();

            let newText = content.substring(0, caret) + ' '.repeat(indent) + content.substring(caret);

            setText({value: newText, caret: caret, target: e.target});

        }

    }

    const handleText = (e) => setText({value: e.target.value, caret: -1, target: e.target});

    return(
        <div className = 'TextareaIndent'>
            <div className = 'Alert'>{alert}</div>
            <textarea
                onBlur    = {endEdition}
                onFocus   = {iniEdition}
                onKeyDown = {handleTab}
                onChange  = {handleText}
                value     = {text.value}
            />
        </div>
    );

}

export default TextareaIndent;