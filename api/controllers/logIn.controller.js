export const postLogIn = async (req, res) => {
    const response = await fetch(`https://${req.body.domain}.kanbanize.com/index.php/api/kanbanize/login/format/json`, {
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
