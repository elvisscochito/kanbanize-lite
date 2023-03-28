const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
const port = 3000
const kanbanizeApiUrl = 'https://university6y.kanbanize.com/api/v2'
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

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`)
})
