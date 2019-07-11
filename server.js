const http = require('http')
const bparse = require('./index.js')
const PORT = 7000

const server = http.createServer(async (req, res) => {
  res.setHeader('content-type', 'application/json')
  await bparse(req)
  const json = JSON.stringify({ params: req.params })
  console.log(json)
  res.end(json)
})
console.log(`Started server on port ${PORT}`)
server.listen(PORT)
