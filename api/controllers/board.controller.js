export const getBoards = async (req, res) => {
    const response = await fetch(`https://${req.headers.domain}.kanbanize.com/api/v2/boards?is_archived=0&if_assigned=1&fields=board_id&expand=structure`, {
        headers: {
            apikey: req.headers.apikey
        }
    });
    const data = await response.json();
    res.json(data);
}

export const getUsersByBoard = async (req, res) => {
    // users_roles -> userId
    const response = await fetch(
        `https://${req.headers.domain}.kanbanize.com/api/v2/boards/${req.params.boardId}/userRoles`,
        {
            headers: {
                apikey: req.headers.apikey,
            }
        }
    );
    const { data } = await response.json();
    let user_ids = "";
    let data2 = [];
    if (data) {
        user_ids = data.map((user) => user.user_id).join(",");

        // username
        const response2 = await fetch(
            `https://${req.headers.domain}.kanbanize.com/api/v2/users?user_ids=${user_ids}`,
            {
                headers: {
                    apikey: req.headers.apikey
                }
            }
        );
        data2 = await response2.json();
    }
    res.json(data2); //<- sacar el username
}

export const getBoard = async (req, res) => {
    const response = await fetch(
        `https://${req.headers.domain}.kanbanize.com/api/v2/boards?board_ids=${req.params.boardId}&if_assigned=1&fields=board_id,name&expand=workflows`,
        {
            headers: {
                apikey: req.headers.apikey
            }
        }
    );
    const data = await response.json();
    res.json(data);
}

export const getColumns = async (req, res) => {
    const response = await fetch(
        `https://${req.headers.domain}.kanbanize.com/api/v2/boards/${req.params.boardId}/columns`,
        {
            headers: {
                apikey: req.headers.apikey
            }
        }
    );
    const data = await response.json();
    res.json(data);
}

export const getCards = async (req, res) => {
    const response = await fetch(
        `https://${req.headers.domain}.kanbanize.com/api/v2/cards?board_ids=${req.params.boardId}&fields=card_id,title,description,owner_user_id,deadline,board_id,workflow_id,column_id,comment_count`,
        {
            headers: {
                apiKey: req.headers.apikey
            }
        }
    );
    const data = await response.json();
    res.json(data);
}

export const postCard = async (req, res) => {
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apiKey: req.headers.apikey
        },
        body: JSON.stringify({
            column_id: req.body.column_id,
            lane_id: req.body.lane_id,
            title: req.body.title,
            description: req.body.description
        }),
    });
    const data = await response.json();
    res.json(data);
}

export const patchCard = async (req, res) => {
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards/${req.params.cardId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            apiKey: req.headers.apikey
        },
        body: JSON.stringify({
            column_id: req.body.column_id,
        }),
    });
    const data = await response.json();
    res.json(data);
}

export const getComments = async (req, res) => {
    const response = await fetch(
        `https://${req.headers.domain}.kanbanize.com/api/v2/cards/${req.params.cardId}/comments`,
        {
            headers: {
                apiKey: req.headers.apikey
            }
        }
    );
    const data = await response.json();
    res.json(data);
}

export const postComment = async (req, res) => {
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/api/v2/cards/${req.params.cardId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apiKey: req.headers.apikey
        },
        body: JSON.stringify({
            text: req.body.text/* ,
            attachments_to_add: req.body.attachments_to_add */
        }),
    });
    const data = await response.json();
    res.json(data);
}
