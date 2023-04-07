import { useState, useLayoutEffect } from 'react'
import styles from '../styles/Home.module.css'
import { Link } from 'react-router-dom'

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

  console.log(boards)

  return (
    <>
      <header className={styles.header}>
        <h1>Boards</h1>
      </header>
      <div className={styles.grid}>
        {boards.map(board => (
          <div key={board.board_id} className={styles.board}>
            <Link to={`/kanbanize-lite/board/${board.board_id}`}><span>{board.name}</span></Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
