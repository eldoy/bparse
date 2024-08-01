var formidable = require('formidable').default

var DEFAULT_OPTIONS = {
  maxFileSize: 20000 * 1024 * 1024
}

function toJSON(obj = {}) {
  for (var key in obj) {
    if (obj[key] && typeof obj[key] == 'object') {
      toJSON(obj[key])
    } else {
      try {
        obj[key] = JSON.parse(obj[key])
      } catch (e) {}
    }
  }
}

function toObject(file) {
  var date = file.lastModifiedDate
  return {
    path: file.path,
    lastModified: date.valueOf(),
    lastModifiedDate: date,
    name: file.name,
    size: file.size,
    type: file.type
  }
}

module.exports = async function bparse(req, options = {}) {
  options = { ...DEFAULT_OPTIONS, ...options }

  req.files = []
  req.params = {}

  var form = formidable(options)

  try {
    var [params, files] = await form.parse(req)
    req.params = params
    req.files = files
    if (/multipart/i.test(req.headers['content-type'])) {
      toJSON(req.params)
    }
  } catch (e) {}
}
