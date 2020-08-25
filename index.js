const formidable = require('formidable')

const DEFAULT_OPTIONS = {
  maxFileSize: 20000 * 1024 * 1024
}

const decode = (obj = {}) => {
  for (const key in obj) {
    if (obj[key] && typeof obj[key] === 'object') {
      decode(obj[key])
    } else if (typeof obj[key] === 'string') {
      obj[key] = decodeURIComponent(obj[key])
    }
  }
}

const toJSON = (obj = {}) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = JSON.parse(obj[key])
    }
  }
}

const bodyParser = (req, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }
  const form = formidable(options)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (!err) {
        req.files = files
        req.params = fields
        if (/multipart/i.test(req.headers['content-type'])) {
          toJSON(req.params)
        }
        decode(req.params)
      }
      resolve(req)
    })
  })
}

module.exports = bodyParser
