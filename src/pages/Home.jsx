import { useState, useLayoutEffect } from 'react'

const apiUrl = 'http://localhost:3000/api/v2/boards'

const fetchBoards = async () => {
  const response = await fetch(apiUrl)
  return await response.json()
}

function Home () {

  const [boards, setBoards] = useState([])

  useLayoutEffect(() => {
    fetchBoards().then(({ data }) => {
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

export default Home
