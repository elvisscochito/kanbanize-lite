import { useRef } from 'react';

const Modal = () => {
    const dialog = useRef(null);

    const showModal = () => {
        dialog.current.showModal()
    }

    const hideModal = () => {
        dialog.current.close()
    }

    return (
        <>
            <button onClick={showModal}>Show modal</button>
            <dialog ref={dialog}>
                <header>
                    <h1>Modal</h1>
                </header>
                <p>Body</p>
                <footer>
                    <button onClick={hideModal}>Close</button>
                </footer>
            </dialog>
        </>
    );
}

export default Modal
