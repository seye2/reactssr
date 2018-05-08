#!/usr/bin/env bash

node ./config/zip.js

apex deploy -s timestamp=$ts reactssr --zip functions/reactssr/reactssr.zip
rm functions/reactssr/reactssr.zip

node ./config/s3upload.js

