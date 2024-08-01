# HTTP Request Body Parser for Node.js

Based on formidable, this body parser will give you parameters and files posted to your Node.js server.

### Installation
```
npm i bparse
```

### Usage
On your Node.js server:

```js
var bparse = require('bparse')

// With default options
await bparse(req)

// With options, same as in node formidable
var options = { maxFileSize: 20000 * 1024 * 1024 }
await bparse(req, options)

// Request parameters
req.params

// Request uploaded files
req.files
```

MIT Licensed. Enjoy!

Created by [Eldøy Projects](https://eldoy.com)
