'use client'

/* import { useState, useEffect } from 'react'

const fetchBoards = async () => {
  const response = await fetch('https://university6y.kanbanize.com/api/v2/boards')
  return await response.json()
} */

const apiKey = '1tfmPDrbo0C1gLoGolZgNWu8lEpQLfR06mgjHwu5'
const apiUrl = 'http://localhost:3001/api/boards'

fetch(apiUrl, {
  headers: {
    apikey: apiKey
  }
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.error(error)
  })

export default function Home () {
  /* const [boards, setBoards] = useState([])

  useEffect(() => {
    fetchBoards().then(data => {
      setBoards(data)
    })
  }, []) */

  return (
    <>
      <h1>Boards</h1>
      {/* {boards.map(board => (
        <div key={board.board_id}>
          <p>{board.name}</p>
        </div>
      ))} */}
    </>
  )
}
