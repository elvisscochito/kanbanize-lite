'use client'

import { useState, useEffect } from 'react'

const apiUrl = 'http://localhost:3000/api/v2/boards'

const fetchBoards = async () => {
  const response = await fetch(apiUrl)
  return await response.json()
}

export default function Home () {
  
  const [boards, setBoards] = useState([])

  useEffect(() => {
    fetchBoards().then(({data}) => {
      setBoards(data)
    })
  }, [])

  return (
    <>
      <h1>Boards</h1>
      {boards.map(board => (
        <div key={board.board_id}>
          <p>{board.name}</p>
        </div>
      ))}
    </>
  )
}
