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
      try {
        obj[key] = JSON.parse(obj[key])
      } catch(e) {}
    }
  }
}

const bparse = (req, options = {}) => {
  options = { ...DEFAULT_OPTIONS, ...options }

  req.files = []
  req.params = {}

  const form = formidable(options)

  return new Promise((resolve, reject) => {
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
      if (/multipart/i.test(req.headers['content-type'])) {
        toJSON(req.params)
      }
      decode(req.params)
      resolve(req)
    })

    form.parse(req)
  })
}

module.exports = bparse
