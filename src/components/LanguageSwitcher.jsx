const LanguageSwitcher = ({ currentLanguage, changeLanguage }) => {
    return (
        <button onClick={changeLanguage}>{currentLanguage}</button>
    );
}

export default LanguageSwitcher;
