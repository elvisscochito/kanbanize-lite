import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css';
import apiUrlPrefix from '../config/apiUrlPrefix';

function Home(props) {
  const { t } = useTranslation("global");
  const [boards, setBoards] = useState([])
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBoardsAndDetails = async () => {
      let response = await fetch(`${apiUrlPrefix}/board`, {
        method: 'GET',
        headers: {
          'apikey': localStorage.getItem('apikey')
        }
      })
      const boardsResponse = await response.json()
      console.log(boardsResponse, "boardsResponse")

      const boards = []
      for await (let board of boardsResponse.data) {
        console.log(`${apiUrlPrefix}/${board.board_id}`)
        response = await fetch(`${apiUrlPrefix}/usersByBoard/${board.board_id}`, {
          method: 'GET',
          headers: {
            'apikey': localStorage.getItem('apikey')
          }
        })
        const users = await response.json()
        console.log(users, "users")
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  if (!boards) {
    return <div>Loading...</div>
  } else if (boards.length === 0) {
    return <div>No boards found</div>
  }

  const filteredBoards = boards.filter((board) => {
    const boardNameString = String(board.structure.name).toLowerCase();
    const usersString = board.users
      .map((user) => user.username)
      .join(' ')
      .toLowerCase();

    return (
      boardNameString.includes(searchTerm.toLowerCase()) ||
      usersString.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <header className={styles.header}>
        <h1>{t("Translation.Boards")}</h1>
      </header>
      <div className={styles.grid}>
        <div className={styles.search}>
          <label htmlFor='search'>{t("Translation.Search")}:</label>
          <input
            id='search'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        {filteredBoards.map((board) => (
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
                    {user.username}&nbsp;
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
