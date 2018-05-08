const fs = require('fs');
const path = require('path');
const zip = new require('node-zip')();


zip.file('index.js', fs.readFileSync(path.join(__dirname, '../functions/reactssr/server/*')));
var data = zip.generate({base64:false,compression:'DEFLATE'});
fs.writeFileSync('../functions/reactssr/reactssr.zip', data, 'binary');


