import { useLayoutEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from '../styles/Board.module.css';

const apiUrl = 'http://localhost:3000/api/v2/boards/:boardId'

const apiUrlPrefix = 'http://localhost:3000/api/v2'

function Board(props) {
    
    const { boardId } = useParams();
    
    const location = useLocation();
    console.log(location.state.board.structure, " useLocation Hook");
    
    const [board, setBoard] = useState([])
    const [workflows, setWorkflows] = useState([])
    const [columns, setColumns] = useState([])

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
    
    const columnsFilter = Object.entries(columns).map(([key, value]) => {
        return {
            column_id: key,
            name: value.name,
            workflow_id: value.workflow_id
        }
    })

    /* now merge workflowsFilter and columnsFilter by the same workflow_id and keep key and values of both */
    /* const workflowsAndColumnsMerged = workflowsFilter.map(workflow => {
        return {
            ...workflow,
            ...columnsFilter.find(column => column.workflow_id === workflow.workflow_id)
        }
    }) */

    const workflowsAndColumnsMerged = workflowsFilter.map(workflow => {
        return {
            ...workflow,
            ...columnsFilter.filter(column => column.workflow_id === workflow.workflow_id && column.name)
        }
    })

    console.log("merged", workflowsAndColumnsMerged)

    console.log("workflowsFilter", workflowsFilter)
    console.log("columnsFilter", columnsFilter)

    /* clean columns to separate columns with the same workflow_id and their columns*/
    /* const cleanColumns = columns.reduce((acc, column) => {
        if (!acc[column.workflow_id]) {
            acc[column.workflow_id] = {
                workflow_id: column.workflow_id,
                columns: []
            }
        }
        acc[column.workflow_id].columns.push(column)
        return acc
    }, {})
    console.log(cleanColumns) */

    /* log the first object and their columns in the object and access the first array in the object */
    /* console.log(cleanColumns[Object.keys(cleanColumns)[0]].columns[0])
 */
    /* save the first object and their columns in the object */
    /* const firstObject = cleanColumns[Object.keys(cleanColumns)[0]].columns
    console.log(firstObject) */

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

    return (
        <>
            <header className={styles.header}>
                <h1>{board.name}</h1>
            </header>

            <div className={styles.container}>
                <select>
                    {
                        workflowsFilter.map(workflow => (
                            workflow.type === 0 &&
                            <option key={workflow.workflow_id} value={workflow.workflow_id}>{workflow.name}</option>
                        ))
                    }
                </select>
                
                <Slider {...settings}>
                    {columnsFilter.map(column => (
                        <div key={column.column_id} className={styles.column}>
                            <div className={styles.nameContainer}>
                                <span className={styles.name}>{column.name}</span>
                            </div>
                            <div className={styles.content}>
                                <span>{column.name}</span>
                            </div>
                        </div>
                    ))}
                </Slider>
                
                {/* <Slider {...settings}>
                    {firstObject.map(column => (
                        <div key={column.column_id} className={styles.column}>
                            <div className={styles.nameContainer}>
                                <span className={styles.name}>{column.name}</span>
                            </div>
                            <div className={styles.content}>
                                <span>{column.name}</span>
                            </div>
                        </div>
                    ))}
                </Slider> */}
            </div>
       </>
    )
}

export default Board;
