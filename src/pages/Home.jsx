import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';

const apiUrlPrefix = 'http://localhost:3000/api/v2'

function Home (props) {
  
  const {t} = useTranslation("global");
  const [boards, setBoards] = useState([])

  useEffect(() => {
    const fetchBoardsAndDetails = async () => {
      let response = await fetch(`${apiUrlPrefix}/boards`)
      const boardsResponse = await response.json()
      console.log(boardsResponse, "boardsResponse")
   
      const boards = []
      for await(let board of boardsResponse.data) {
        console.log(`${apiUrlPrefix}/${board.board_id}`)
        response = await fetch(`${apiUrlPrefix}/usersByBoard/${board.board_id}`)
        const users = await response.json()
        console.log(users)
        board = {
          ...board,
          users: users.data
        }
        console.log(board);
        boards.push(board)
      }

      setBoards(boards)
    }

    fetchBoardsAndDetails()
  }, [])

  if (!boards || boards.length === 0) {
    return <div>Loading...</div>
  }
  
  return (
		<>
			<header className={styles.header}>
				<h1>{t("Translation.Boards")}</h1>
			</header>
			<div className={styles.grid}>
				{boards.map((board) => (
					<div key={board.board_id} className={styles.board}>
						<header className={styles.boardHeader}>
						  <Link to={`/kanbanize-lite/board/${board.board_id}`} state={{ board: board }}>
								<h3>{board.structure.name}</h3>
						  </Link>
						</header>
						<div className={styles.users}>
							{board.users &&
								board.users.length > 0 &&
								board.users.map((user) => (
									<span key={user.user_id}>
										{user.username}
									</span>
								))}
						</div>
					</div>
				))}
			</div>
		</>
  );
}

export default Home
