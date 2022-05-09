const formidable = require('formidable')

const DEFAULT_OPTIONS = {
  maxFileSize: 20000 * 1024 * 1024
}

function toJSON(obj = {}) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      try {
        obj[key] = JSON.parse(obj[key])
      } catch(e) {}
    }
  }
}

function toObject(file) {
  const date = file.lastModifiedDate
  return {
    path: file.path,
    lastModified: date.valueOf(),
    lastModifiedDate: date,
    name: file.name,
    size: file.size,
    type: file.type
  }
}

module.exports = function bparse(req, options = {}) {
  options = { ...DEFAULT_OPTIONS, ...options }

  req.files = []
  req.params = {}

  const form = formidable(options)

  return new Promise((resolve, reject) => {
    form.on('file', (field, file) => {
      req.files.push(toObject(file))
    })

    form.on('field', (field, value) => {
      req.params[field] = value
    })

    form.on('error', (err) => {
      resolve(req)
    })

    form.once('end', (body) => {
      if (/multipart/i.test(req.headers['content-type'])) {
        toJSON(req.params)
      }
      req.body = body
      resolve(req)
    })

    form.parse(req)
  })
}
