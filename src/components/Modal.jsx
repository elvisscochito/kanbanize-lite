import { useId, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import apiUrlPrefix from '../config/apiUrlPrefix';
import styles from './Modal.module.css';

const Modal = ({ board_id, column_id, lane_id, forceUpdate }) => {
    const dialog = useRef(null);
    const form = useRef();
    const id = useId();
    const { t } = useTranslation("global");

    const showModal = () => {
        dialog.current.showModal()
    }

    const hideModal = () => {
        dialog.current.close()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = JSON.stringify({
            column_id: column_id,
            lane_id: lane_id,
            title: form.current.title.value,
            description: form.current.description.value,
            domain: localStorage.getItem('domain')
        })

        const response = await fetch(`${apiUrlPrefix}/board/${board_id}/card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': localStorage.getItem('apikey')
            },
            body: formData
        })

        const data = await response.json() // user info data
        console.log(data)
        forceUpdate()
        //if data OK
        //setCards(prev => {
        //   return [...prev, nuevo]
        //})
    }

    return (
        <>
            <button onClick={showModal} className={`${styles.normalBtn} ${styles.newCardBtn}`}>{t("Translation.createNewCard")}</button>
            <dialog ref={dialog}>
                <header>
                    <h1>{t("Translation.NewCard")}</h1>
                </header>
                <form className={styles.form} ref={form} onSubmit={handleSubmit} id={`${id}-modalForm`}>
                    <fieldset className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor={`${id}-cardTitle`}>{t("Translation.CardTitle")}:</label>
                        <input type='text' className={styles.input} id={`${id}-cardTitle`} name='title' placeholder={t("Translation.CardTitlePlaceholder")} required />
                    </fieldset>

                    <fieldset className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor={`${id}-cardDescription`}>{t("Translation.CardDescription")}:</label>
                        <input type='text' className={styles.input} id={`${id}-cardDescription`} name='description' placeholder={t("Translation.CardDescriptionPlaceholder")} required />
                    </fieldset>

                    <footer className={styles.formFooter}>
                        <button type='button' onClick={hideModal} className={`${styles.normalBtn} ${styles.cancelBtn}`}>{t("Translation.CardCancel")}</button>
                        <button type='submit' onClick={hideModal} className={`${styles.normalBtn} ${styles.submitBtn}`}>{t("Translation.createCard")}</button>
                    </footer>
                </form>
            </dialog>
        </>
    );
}

export default Modal
