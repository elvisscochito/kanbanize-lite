import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const kanbanizeApiUrl = "https://university6y.kanbanize.com/api/v2";
const kanbanizeOldApiUrl =
	"https://university6y.kanbanize.com/index.php/api/kanbanize";
const apiKey = "BxdrgpSqJp7dV7zVhE8cG1WZfjLKtgnZ8i3LjbrV";

app.post("/api/v2/login", async (req, res) => {
	const response = await fetch(`${kanbanizeOldApiUrl}/login/format/json`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: req.body.email,
			pass: req.body.password,
		}),
	});
	const data = await response.json();
	res.json(data);
});

app.get("/api/v2/boards", async (req, res) => {
	const response = await fetch(
		`${kanbanizeApiUrl}/boards?if_assigned=1&fields=board_id&expand=structure`,
		{
			headers: {
				apiKey: apiKey,
			},
		}
	);
	const data = await response.json();
	res.json(data);
});

app.get("/api/v2/usersByBoard/:boardId", async (req, res) => {
	// users_roles -> userId
	const response = await fetch(
		`${kanbanizeApiUrl}/boards/${req.params.boardId}/userRoles`,
		{
			headers: {
				apiKey: apiKey,
			},
		}
	);
	const { data } = await response.json();
	let user_ids = "";
	let data2 = [];
	if (data) {
		user_ids = data.map((user) => user.user_id).join(",");

		// username
		const response2 = await fetch(
			`${kanbanizeApiUrl}/users?user_ids=${user_ids}`,
			{
				headers: {
					apiKey: apiKey,
				},
			}
		);
		data2 = await response2.json();
	}
	res.json(data2); //<- sacar el username
});

app.get("/api/v2/boards/:boardId", async (req, res) => {
	const response = await fetch(
		`${kanbanizeApiUrl}/boards?board_ids=${req.params.boardId}&if_assigned=1&fields=board_id,name&expand=workflows`,
		{
			headers: {
				apiKey: apiKey,
			},
		}
	);
	const data = await response.json();
	res.json(data);
});

app.get("/api/v2/boards/:boardId/columns", async (req, res) => {
	const response = await fetch(
		`${kanbanizeApiUrl}/boards/${req.params.boardId}/columns`,
		{
			headers: {
				apiKey: apiKey,
			},
		}
	);
	const data = await response.json();
	res.json(data);
});

app.get("/api/v2/boards/:boardId/cards", async (req, res) => {
	const response = await fetch(
		`${kanbanizeApiUrl}/cards?board_ids=${req.params.boardId}&fields=card_id,title,description,owner_user_id,deadline,board_id,workflow_id,column_id,comment_count`,
		{
			headers: {
				apiKey: apiKey,
			},
		}
	);
	const data = await response.json();
	res.json(data);
});

/* app.get('/api/v2/boards/:boardId/userRoles', async (req, res) => {
  const response = await fetch(`${kanbanizeApiUrl}/boards/${req.params.boardId}/userRoles`, {
    headers: {
      'apiKey': apiKey
    }
  })
  const data = await response.json()
  res.json(data)
}) */

/* // "https://university6y.kanbanize.com/api/v2/users?user_ids=2,6,10,19"
app.get('/api/v2/users', async (req, res) => {
  const response = await fetch(`${kanbanizeApiUrl}/users?user_ids=${req.query.user_ids}`, {
    headers: {
      'apiKey': apiKey
    }
  })
  const data = await response.json()
  res.json(data)
}) */

app.listen(port, () => {
	console.log(`Proxy server listening at http://localhost:${port}`);
});
