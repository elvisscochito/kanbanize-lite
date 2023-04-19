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
    const [selectedWorkflow, setSelectedWorkflow] = useState(-1);

    const handleChangeWorkflow= (event) => {
        console.warn(event.target.value)
        setSelectedWorkflow(event.target.value)
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

    const workflowsAndColumnsMerged = workflowsFilter.map((workflow)=>{
        return {
            ...workflow,
            columns: columnsFilter.filter((column)=>column.workflow_id === Number(workflow.workflow_id))
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
									<div className={styles.column}>
                                        <div className={styles.nameContainer}>
                                            <span className={styles.name}>
										        {column.name}
                                            </span>
                                        </div>
                                        <div className={styles.content}>
                                            <span>{column.name}</span>
                                        </div>
									</div>
								))
							)
					) : (
						<div></div>
					)}
				</Slider>
			</div>
		</>
	);
}

export default Board;
