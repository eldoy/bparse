const formidable = require('formidable')

const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    const form = formidable.IncomingForm()
    req.files = []
    req.params = {}
    form.maxFileSize = 20000 * 1024 * 1024

    form.on('file', function(field, file) {
      req.files.push(file)
    })

    form.on('field', (field, value) => {
      req.params[field] = decodeURIComponent(value)
    })

    form.on('error', (err) => {
      resolve(req)
    })

    form.on('end', () => {
      resolve(req)
    })

    form.parse(req)
  })
}

module.exports = bodyParser
