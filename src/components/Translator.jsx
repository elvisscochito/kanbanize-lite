
import { useEffect, useState } from "react";
import React from 'react';
import Translation from '../assets/Languages.json';

const languages = Object.keys(Translation); // get the available languages from the Translation object

const Translator = ({children}) => {
    const [languageIndex, setLanguageIndex] = useState(0);
    const [translation, setTranslation] = useState(Translation[languages[languageIndex]]);

    const changeLanguage = () => {
        setLanguageIndex((languageIndex + 1) % languages.length); // toggle between the available languages one by one
    }

    useEffect(() => {
        setTranslation(Translation[languages[languageIndex]]);
    }, [languageIndex])

    const currentLanguage = languages[languageIndex]; // get the current language name

    // recursively clone the children components and pass the translated text as props
    const translatedChildren = React.Children.map(children, (child) =>
        React.cloneElement(child, { translation })
    );
    
    return (
        <>
            <button onClick={changeLanguage}>{currentLanguage}</button>
            {translatedChildren}
        </>
    )
}

export default Translator;
