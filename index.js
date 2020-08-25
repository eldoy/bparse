const formidable = require('formidable')

const decode = function(obj = {}) {
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      decode(obj[key])
    } else if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable({
      maxFileSize: 20000 * 1024 * 1024
    })
    req.files = []
    req.params = {}

    form.on('file', (field, file) => {
      req.files.push(file)
    })

    form.on('field', (field, value) => {
      req.params[field] = value
    })

    form.on('error', (err) => {
      resolve(req)
    })

    form.once('end', () => {
      decode(req.params)
      resolve(req)
    })

    form.parse(req)
  })
}

module.exports = bodyParser
