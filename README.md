# HTTP Request Body Parser for Node.js

Based on formidable, this body parser will give you parameters and files posted to your Node.js server.

### INSTALLATION
```npm i bparse``` or ```yarn add bparse```

### USAGE
On your Node.js server:
```javascript
await bodyparser(req)

// Request parameters
req.params

// Request uploaded files
req.files
```
Enjoy! MIT Licensed.
