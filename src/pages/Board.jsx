import { useId, useLayoutEffect, useReducer, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Modal from '../components/Modal';
import ModalDialog from '../components/ModalDialog';
import apiUrlPrefix from '../config/apiUrlPrefix';
import styles from '../styles/Board.module.css';

function Board(props) {

    const { boardId } = useParams();
    const { t } = useTranslation("global");
    const id = useId();
    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const location = useLocation();
    const [board, setBoard] = useState([])
    const [workflows, setWorkflows] = useState([])
    const [columns, setColumns] = useState([])
    const [selectedWorkflow, setSelectedWorkflow] = useState(-1);
    const [cards, setCards] = useState([])
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    /* const [showModal, setShowModal] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState(null); */

    /* const [card, setCard] = useState({
        card_id: null,
        title: "",
        description: "",
        comment_count: 0,
    }); */


    useLayoutEffect(() => {
        setBoard(location.state.board.structure)
        setWorkflows(location.state.board.structure.workflows)
        setColumns(location.state.board.structure.columns)
        setUsers(location.state.board.users)
    }, [location.state.board.structure])

    const handleChangeWorkflow = (event) => {
        setSelectedWorkflow(event.target.value)
    }

    const fetchCards = async (boardId) => {
        try {
            const response = await fetch(`${apiUrlPrefix}/board/${boardId}/cards`, {
                method: 'GET',
                headers: {
                    'apikey': localStorage.getItem('apikey'),
                    'domain': localStorage.getItem('domain')
                }
            })
            return await response.json()
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    useLayoutEffect(() => {
        fetchCards(boardId).then(({ data }) => {
            setCards(data.data)
        })
    }, [reducerValue])

    const cardsFormatDate = Object.entries(cards).map(([key, value]) => {
        return {
            ...value,
            deadline: value.deadline ? new Date(value.deadline).toLocaleDateString() : null,
            description: value.description ? value.description.replace(/<p>/g, '').replace(/<\/p>/g, '') : null
        }
    })

    const workflowsFilter = Object.entries(workflows).map(([key, value]) => {
        return {
            workflow_id: key,
            name: value.name,
            type: value.type
        }
    })

    const columnsFilter = Object.entries(columns).map(([key, value]) => {
        return {
            column_id: key,
            name: value.name,
            workflow_id: value.workflow_id
        }
    })

    const workflowsAndColumnsMerged = workflowsFilter.map((workflow) => {
        return {
            ...workflow,
            columns: columnsFilter.filter((column) => column.workflow_id === Number(workflow.workflow_id))
        }
    })

    const workflowsAndColumnsCleaned = workflowsAndColumnsMerged.filter(workflow => workflow.type === 0)
    console.log("workflowsAndColumnsCleaned:", workflowsAndColumnsCleaned)

    /** @note fallback */

    if (!board || !columns || columns.length === 0) {
        return <div>Loading...</div>
    }

    /** @note settings for slider */

    const settings = {
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };

    function PrevArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                Prev
            </div>
        );
    }

    function NextArrow(props) {
        const { className, onClick } = props;
        return (
            <div
                className={className}
                onClick={onClick}
            >
                Next
            </div>
        );
    }

    /** @note search bar */

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(event.target.value);
    };

    const filteredCards = cardsFormatDate.filter((card) => {
        const cardTitle = card.title.toLowerCase();
        /* or maybe change the default value from null to none and hide it */
        const cardDescription = card.description ? card.description.toLowerCase() : "";
        /* const commentCount = card.comment_count ? card.comment_count.toLowerCase() : ""; */
        const cardDeadline = card.deadline ? card.deadline.toLowerCase() : "";

        /* const user = users.find((user) => user.user_id === card.owner_user_id);
        const cardUser = user.username ? user.username.toLowerCase() : ""; */

        return (
            cardTitle.includes(searchTerm.toLowerCase()) || cardDescription.includes(searchTerm.toLowerCase() /* || commentCount.includes(searchTerm.toLowerCase()) */ /* || cardDeadline.includes(searchTerm.toLowerCase()) */ /* || cardUser.includes(searchTerm.toLowerCase()) */)
        );
    });

    /** @note modal */

    /* const openModal = ({ card_id, title, description, comment_count }) => {
        setCard({
            card_id: card_id,
            title: title,
            description: description,
            comment_count: comment_count,
        });

        setShowModal(true);
    }; */

    /* const closeModal = () => {
        setShowModal(false);
        setCard({
            card_id: null,
            title: "",
            description: "",
            comment_count: 0,
        });
    }; */

    return (
        <>
            <header className={styles.header}>
                <h1>{board.name}</h1>
            </header>

            <div className={styles.container}>
                <select onChange={handleChangeWorkflow} className={styles.select}>
                    <option value={-1}>{t("Translation.SelectWorkflow")}</option>
                    {workflowsAndColumnsCleaned.map((workflow) => (
                        <option
                            key={workflow.workflow_id}
                            value={workflow.workflow_id}
                        >
                            {workflow.name}
                        </option>
                    ))}
                </select>

                <Slider {...settings}>
                    {selectedWorkflow !== -1 ? (
                        workflowsAndColumnsCleaned
                            .filter(
                                (workflow) =>
                                    workflow.workflow_id === selectedWorkflow
                            )
                            .map((workflow) =>
                                workflow.columns.map((column) => (
                                    <div className={styles.column} key={column.column_id}>
                                        <div className={styles.nameContainer}>
                                            <span className={styles.name}>
                                                {column.name}
                                            </span>
                                        </div>
                                        <div className={styles.content}>

                                            <div className={styles.search}>
                                                <label htmlFor={`${id}-search`}>{t("Translation.Search")}:</label>
                                                <input
                                                    id={`${id}-search`}
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    placeholder={t("Translation.SearchPlaceholder")}
                                                />
                                            </div>

                                            {
                                                column.name == "Backlog" &&
                                                <div className={styles.btnCreateCard}>
                                                    <Modal board_id={boardId} column_id={column.column_id} lane_id={workflow.workflow_id} forceUpdate={forceUpdate} />
                                                </div>
                                            }

                                            {filteredCards.map((card) => (
                                                card.column_id == column.column_id ? (
                                                    <div className={styles.card} key={card.card_id} /* onClick={() => openModal({ card_id: card.card_id, title: card.title, description: card.description, comment_count: card.comment_count })} */>
                                                        <ModalDialog /* setSelectedCardId={setSelectedCardId} */ columnId={column.column_id} boardId={boardId} cardId={card.card_id} title={card.title} description={card.description} comment_count={card.comment_count} deadline={card.deadline} selectedWorkflow={selectedWorkflow} workflowsAndColumnsCleaned={workflowsAndColumnsCleaned} /* isOpen={showModal} onClose={closeModal} */ forceUpdateProp={forceUpdate} />
                                                        <header className={styles.cardHeader}>
                                                            <h3>{card.title}</h3>
                                                        </header>
                                                        <div className={styles.cardBody}>
                                                            {
                                                                card.description &&
                                                                <p>{card.description}</p>
                                                            }

                                                            <div className={styles.cardDetails}>
                                                                {
                                                                    card.comment_count &&
                                                                    <span>{card.comment_count}</span>
                                                                }
                                                                {
                                                                    card.deadline &&
                                                                    <span>{card.deadline}</span>
                                                                }

                                                                {
                                                                    users.map((user) => (
                                                                        user.user_id === card.owner_user_id &&
                                                                        <span>{user.username}</span>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <></>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )
                    ) : (
                        <></>
                    )}
                </Slider>
            </div>
        </>
    );
}

export default Board;
