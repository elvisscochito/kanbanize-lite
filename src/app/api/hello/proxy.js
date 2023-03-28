const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
const port = 3001
const kanbanizeApiUrl = 'https://university6y.kanbanize.com'

app.use('/api', createProxyMiddleware({
  target: kanbanizeApiUrl,
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('apikey', '1tfmPDrbo0C1gLoGolZgNWu8lEpQLfR06mgjHwu5')
  }
}))

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`)
})
