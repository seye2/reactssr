const AWS = require("aws-sdk"); // from AWS SDK
const fs = require("fs"); // from node.js
const path = require("path"); // from node.js
const Lambda = new AWS.Lambda({"region": "ap-northeast-2"});


// configuration
const config = {
	s3BucketName: 'reactssr',
	folderPath: '../functions/reactssr/client' // path relative script's location
};

// initialize S3 client
const s3 = new AWS.S3({ signatureVersion: 'v4' });

// resolve full folder path
const distFolderPath = path.join(__dirname, config.folderPath);
let uploadPath="";
let option={};

const credentials = new AWS.SharedIniFileCredentials({'profile':'default'});
credentials.refresh(function(err) {
	/* This operation retrieves a Lambda function alias */

	const params = {
		FunctionName: "reactssr"
	};

	Lambda.listAliases(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else {
			// successful response
			console.log("success::", data.Aliases[0].FunctionVersion);

			//s3 file upload
			// get of list of files from 'dist' directory
			fs.readdir(distFolderPath, function (err, files) {

				if (!files || files.length === 0) {
					console.log(`provided folder '${distFolderPath}' is empty or does not exist.`);
					console.log('Make sure your project was compiled!');
					return;
				}

				// for each file in the directory
				for (const fileName of files) {

					// get the full path of the file
					const filePath = path.join(distFolderPath, fileName);

					// ignore if directory
					if (fs.lstatSync(filePath).isDirectory()) {
						continue;
					}

					// read file contents
					fs.readFile(filePath, function (error, fileContent) {
						// if unable to read file contents, throw exception
						if (error) {
							throw error;
						}

						for(var i = 0; i < 2; i++) {

							//LATEST와 람다 최신 버전 폴더에 파일 복사
							(i===0) ? uploadPath=`static/LATEST/${fileName}`
								: uploadPath=`static/${data.Aliases[0].FunctionVersion}/${fileName}`

							if(fileName.match("css")) {
								option={
									Bucket: config.s3BucketName,
									Key: uploadPath,
									ContentType:"text/css",
									Body: fileContent,
									ACL: 'public-read'
								}
							} else {
								option={
									Bucket: config.s3BucketName,
									Key: uploadPath,
									Body: fileContent,
									ACL: 'public-read'
								}
							}

							// upload file to S3
							s3.putObject(option, function (res) {
								console.log(`Successfully uploaded '${fileName}'!`);
							});
						}


					});
				}
			});
		}
	});
});


