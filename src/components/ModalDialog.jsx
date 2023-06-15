import { useEffect, useId, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import apiUrlPrefix from '../config/apiUrlPrefix';
import styles from '../styles/ModalDialog.module.css';

const ModalDialog = ({ columnId, selectedWorkflow, workflowsAndColumnsCleaned, boardId, cardId, title, description, comment_count, deadline, forceUpdateProp }) => {
    const { t } = useTranslation("global");
    const id = useId();
    const modal = useRef(null);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(-1);
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const form = useRef();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        if (isOpenModal) {
            modal.current.showModal();
        } else {
            modal.current.close();
        }
    }, [isOpenModal]);

    useEffect(() => {
        if (selectedColumn !== -1) {
            const formData = JSON.stringify({
                column_id: selectedColumn,
                domain: localStorage.getItem('domain'),
            });

            const updateCard = async () => {
                try {
                    const response = await fetch(
                        `${apiUrlPrefix}/board/${boardId}/card/${cardId}`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                apikey: localStorage.getItem('apikey'),
                            },
                            body: formData,
                        }
                    );

                    const data = await response.json();
                    console.log(data);

                    forceUpdateProp();
                } catch (error) {
                    console.error(error);
                    throw error;
                }
            };

            updateCard();
        }
    }, [selectedColumn, boardId, cardId]);

    const handleChangeColumn = (e) => {
        setSelectedColumn(parseInt(e.target.value));
    };

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };

    const handleClose = () => {
        setIsOpenModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const text = e.target.comment.value;

        const formData = JSON.stringify({
            text: text,
            domain: localStorage.getItem('domain'),
        });

        try {
            const response = await fetch(
                `${apiUrlPrefix}/board/${boardId}/${cardId}/comment`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        apikey: localStorage.getItem('apikey'),
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
            throw error;
        }

        e.target.comment.value = '';
        forceUpdate();
    };

    const fetchComments = async () => {
        try {
            const response = await fetch(
                `${apiUrlPrefix}/board/${boardId}/${cardId}/comments`,
                {
                    method: 'GET',
                    headers: {
                        apikey: localStorage.getItem('apikey'),
                        domain: localStorage.getItem('domain'),
                    },
                }
            );

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    useEffect(() => {
        fetchComments().then((response) => {
            if (response.data) {
                setComments(response.data);
                console.log(response.data);
            }
        });
    }, [reducerValue, boardId, cardId]);

    return (
        <>
            <dialog ref={modal} id={`modal-${id}`}>
                <button
                    className={`${styles.normalBtn} ${styles.cancelBtn}`}
                    onClick={handleClose}
                >
                    x
                </button>
                <header className={styles.cardHeader}>
                    <h2>{title}</h2>
                </header>
                <div className={styles.cardBody}>
                    <p>{description}</p>
                    <div className={styles.cardDetails}>
                        <span>{comment_count}</span>
                        <span>{deadline}</span>
                    </div>
                </div>
                <hr />
                <select
                    onChange={handleChangeColumn}
                    value={selectedColumn}
                >
                    <option value={-1}>Select a column</option>
                    {selectedWorkflow !== -1 ? (
                        workflowsAndColumnsCleaned
                            .filter((workflow) => workflow.workflow_id === selectedWorkflow)
                            .map((workflow) =>
                                workflow.columns.map((column) => (
                                    <option
                                        key={column.column_id}
                                        value={column.column_id}
                                        selected={column.column_id === columnId}
                                    >
                                        {column.name}
                                    </option>
                                ))
                            )
                    ) : (
                        <p>No columns</p>
                    )}
                </select>
                <hr />
                <form
                    className={styles.form}
                    ref={form}
                    onSubmit={handleSubmit}
                    id={`${id}-modalForm`}
                >
                    <fieldset className={styles.formGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            id={`${id}-cardComment`}
                            name="comment"
                            placeholder={t("Translation.CommentsPlaceholder")}
                            required
                        />
                    </fieldset>
                    <footer className={styles.formFooter}>
                        <button type="submit" className={styles.normalBtn}>
                            {t("Translation.CommentBtn")}
                        </button>
                    </footer>
                </form>
                <hr />
                <div className={styles.comments}>
                    <details>
                        <summary>{t("Translation.Comments")}</summary>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div className={styles.comment} key={comment.comment_id}>
                                    <p>{comment.text}</p>
                                </div>
                            ))
                        ) : (
                            <p>{t("Translation.CommentsCount")}</p>
                        )}
                    </details>
                </div>
            </dialog>
            <button className={styles.normalBtn} onClick={handleOpenModal}>
                {t("Translation.OpenCard")}
            </button>
        </>
    );
};

export default ModalDialog;
