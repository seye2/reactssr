const fs = require('fs');
const path = require('path');
// const zip = new require('node-zip')();
const zipFolder = require('zip-folder');

zipFolder('./functions/reactssr/server', './functions/reactssr/server.zip', function(err) {
	if(err) {
		console.log('oh no!', err);
	} else {
		console.log('EXCELLENT');
	}
});
//
// zip.file('index.js', fs.readFileSync(path.join(__dirname, '../functions/reactssr/server/**')));
// var data = zip.generate({base64:false,compression:'DEFLATE'});
// fs.writeFileSync('../functions/reactssr/reactssr.zip', data, 'binary');
//
//
