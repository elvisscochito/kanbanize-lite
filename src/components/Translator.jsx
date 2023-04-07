import { useEffect, useState } from "react";
import React from 'react';
import Translation from '../assets/Languages.json';
import LanguageSwitcher from '../components/LanguageSwitcher';

const languages = Object.keys(Translation); // get the available languages from the Translation object

const Translator = ({children}) => {
    const storedLanguage = localStorage.getItem("language");
    let storedLanguageIndex = 0;
    if (storedLanguage) {
        storedLanguageIndex = languages.findIndex(language => language === storedLanguage);
    }

    const [languageIndex, setLanguageIndex] = useState(storedLanguageIndex);
    const [translation, setTranslation] = useState(Translation[languages[languageIndex]]);

    const changeLanguage = () => {
        setLanguageIndex((languageIndex + 1) % languages.length); // toggle between the available languages one by one
    }

    useEffect(() => {
        setTranslation(Translation[languages[languageIndex]]);
        localStorage.setItem("language", languages[languageIndex]);
    }, [languageIndex])

    const currentLanguage = languages[languageIndex]; // get the current language name

    // recursively clone the children components and pass the translated text as props
    const translatedChildren = React.Children.map(children, (child) =>
        React.cloneElement(child, { translation })
    );

    /* console.log("languageIndex", languageIndex);
    console.log("localStorage: ", localStorage.getItem("language"));
    console.log('current language:', currentLanguage);
    console.log('translation:', translation); */
    
    return (
        <>
            <LanguageSwitcher currentLanguage={currentLanguage} changeLanguage={changeLanguage} />
            {translatedChildren}
        </>
    )
}

export default Translator;
