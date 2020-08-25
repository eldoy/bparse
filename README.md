# HTTP Request Body Parser for Node.js

Based on formidable, this body parser will give you parameters and files posted to your Node.js server.

### INSTALLATION
```npm i bparse``` or ```yarn add bparse```

### USAGE
On your Node.js server:
```javascript
const bparse = require('bparse')

// With default options
await bparse(req)

// With options, same as in node formidable
const options = { maxFileSize: 20000 * 1024 * 1024 }
await bparse(req, options)

// Request parameters
req.params

// Request uploaded files
req.files
```
Enjoy! MIT Licensed.
