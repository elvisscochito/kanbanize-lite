import { useTranslation } from "react-i18next";

const Dialog = ({ isOpen, title, children, onSubmit, onClose }) => {
    /* const dialog = useRef(null); */
    const { t } = useTranslation("global");


    /* const showModal = () => {
        dialog.current.showModal();
    }

    const hideModal = () => {
        dialog.current.close();
        setIsOpen(false);
    }

    useEffect(() => {
        if (modalIsOpen) {
            showModal();
        } else {
            hideModal();
        }
    }, [modalIsOpen]); */

    return (
        <>
            <dialog open={isOpen} onClose={onClose} /* ref={dialog} */>
                <header>
                    <h2>Comentarios</h2>
                </header>

                <div>
                    <p>Modal content</p>
                </div>

                <footer>
                    <button onClick={onClose}>Close</button>
                </footer>
            </dialog>
        </>
    )
}

export default Dialog;
