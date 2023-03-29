const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
const port = 3000
const kanbanizeApiUrl = 'https://university6y.kanbanize.com/api/v2'
const kanbanizeOldApiUrl = 'https://university6y.kanbanize.com/index.php/api/kanbanize'
const apiKey = '1tfmPDrbo0C1gLoGolZgNWu8lEpQLfR06mgjHwu5'

app.get('/api/v2/boards', async (req, res) => {
  const response = await fetch(`${kanbanizeApiUrl}/boards`, {
    headers: {
      'apiKey': apiKey
    }
  })
  const data = await response.json();
  res.json(data)
})

app.post('/api/v2/login', async (req, res) => {
  console.log(req.body)
  const response = await fetch(`${kanbanizeOldApiUrl}/login/format/json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email: req.body.email, pass: req.body.password})
  })
  const data = await response.json();
  console.log(data)
  res.json(data)
})

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`)
})
