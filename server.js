var http = require('http')
var bparse = require('./index.js')
var PORT = 7000

var server = http.createServer(async (req, res) => {
  res.setHeader('content-type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  await bparse(req)

  var json = JSON.stringify({ params: req.params })
  console.log(json)
  res.end(json)
})
console.log(`Started server on port ${PORT}`)
server.listen(PORT)
