const oldKanbanizeApiUrl = "https://university6y.kanbanize.com/index.php/api/kanbanize";

export const postLogIn = async (req, res) => {
    const response = await fetch(`${oldKanbanizeApiUrl}/login/format/json`, {
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
}
