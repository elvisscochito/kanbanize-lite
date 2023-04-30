import { useLayoutEffect, useId, /* useRef, */ useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from '../styles/Board.module.css';
import { useTranslation } from 'react-i18next';

const apiUrl = 'https://dkgqgo32e1.execute-api.us-east-1.amazonaws.com/boards/:boardId'

function Board(props) {

    const { boardId } = useParams();
    const { t } = useTranslation("global");
    const id = useId();
    /* const form = useRef(); */

    const location = useLocation();
    console.log(location.state.board.structure, " useLocation Hook");

    const [board, setBoard] = useState([])
    const [workflows, setWorkflows] = useState([])
    const [columns, setColumns] = useState([])
    const [selectedWorkflow, setSelectedWorkflow] = useState(-1);
    const [cards, setCards] = useState([])
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeWorkflow = (event) => {
        console.warn(event.target.value)
        setSelectedWorkflow(event.target.value)
    }

    const fetchCards = async (boardId) => {
        const response = await fetch(`${apiUrl}/cards`.replace(':boardId', boardId))
        return await response.json()
    }

    /* const fetchBoards = async (boardId) => {
        const response = await fetch(apiUrl.replace(':boardId', boardId))
        return await response.json()
    }

    const fetchColumns = async (boardId) => {
        const response = await fetch(`${apiUrl}/columns`.replace(':boardId', boardId))
        return await response.json()
    } */


    /* useLayoutEffect(() => {
        fetchBoards(boardId).then(({ data }) => {
            setBoard(data)
        })
    }, [boardId])

    useLayoutEffect(() => {
        fetchColumns(boardId).then(({ data }) => {
            setColumns(data)
        })
    }, [boardId]) */

    useLayoutEffect(() => {
        setBoard(location.state.board.structure)
    }, [location.state.board.structure])

    console.log("board", board)

    useLayoutEffect(() => {
        setWorkflows(location.state.board.structure.workflows)
    }, [location.state.board.structure.workflows])

    console.log("workflows", workflows)

    useLayoutEffect(() => {
        setColumns(location.state.board.structure.columns)
    }, [location.state.board.structure.columns])

    console.log("columns", columns)

    useLayoutEffect(() => {
        fetchCards(boardId).then(({ data }) => {
            setCards(data.data)
        })
    }, [boardId])

    console.log("cards", cards)

    const cardsFormatDate = Object.entries(cards).map(([key, value]) => {
        return {
            ...value,
            deadline: value.deadline ? new Date(value.deadline).toLocaleDateString() : null,
            description: value.description ? value.description.replace(/<p>/g, '').replace(/<\/p>/g, '') : null
        }
    })

    console.warn("cardsFormatDate", cardsFormatDate)

    useLayoutEffect(() => {
        setUsers(location.state.board.users)
    }, [location.state.board.users])

    console.log("users", users)

    if (!board || !columns || columns.length === 0) {
        return <div>Loading...</div>
    }

    const workflowsFilter = Object.entries(workflows).map(([key, value]) => {
        return {
            workflow_id: key,
            name: value.name,
            type: value.type
        }
    })

    console.log("workflowsFilter", workflowsFilter)

    const columnsFilter = Object.entries(columns).map(([key, value]) => {
        return {
            column_id: key,
            name: value.name,
            workflow_id: value.workflow_id
        }
    })

    console.log("columnsFilter", columnsFilter)

    const workflowsAndColumnsMerged = workflowsFilter.map((workflow) => {
        return {
            ...workflow,
            columns: columnsFilter.filter((column) => column.workflow_id === Number(workflow.workflow_id))
        }
    })

    console.log("workflowsAndColumnsMerged", workflowsAndColumnsMerged)

    const workflowsAndColumnsCleaned = workflowsAndColumnsMerged.filter(workflow => workflow.type === 0)

    console.log("workflowsAndColumnsCleaned", workflowsAndColumnsCleaned)

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

    /* const columns2 = [];
    for (let aux of workflowsAndColumnsCleaned.columns) {
        columns2 += aux.workflow_id;
    }

    console.log("columns2", columns2) */

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

    return (
        <>
            <header className={styles.header}>
                <h1>{board.name}</h1>
            </header>

            <div className={styles.container}>
                {/* make a select tag with options based on workflowsAndColumnsCleaned with a default value and onchange to trigger value */}
                <select onChange={handleChangeWorkflow} className={styles.select} /* defaultValue={workflowsAndColumnsCleaned[0].workflow_id} */>
                    <option value={-1}>Select a workflow</option>
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
                                                    {/* copilot do a button to create a card */}
                                                    <button type="submit" className={styles.submitBtn}>Create new card</button>
                                                </div>
                                            }

                                            {filteredCards.map((card) => (
                                                card.column_id == column.column_id ? (
                                                    <div className={styles.card} key={card.card_id}>
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
