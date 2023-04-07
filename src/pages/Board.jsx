import { useState, useLayoutEffect } from 'react'
import { useParams } from "react-router-dom";

const apiUrl = 'http://localhost:3000/api/v2/boards/:boardId'

const fetchBoards = async (boardId) => {
    const response = await fetch(apiUrl.replace(':boardId', boardId))
    return await response.json()
}

function Board() {
    const { boardId } = useParams();

    const [board, setBoard] = useState([])

    useLayoutEffect(() => {
        fetchBoards(boardId).then(({ data }) => {
            setBoard(data)
        })
    }, [boardId])

    if (!board) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{board.name}</h1>
        </div>
    )
}

export default Board;
