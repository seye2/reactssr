'use strict';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import {app} from './app';

app.use(awsServerlessExpressMiddleware.eventContext());

const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => {
    if(context && context.functionVersion) {
        let nowDate = new Date();
        event.functionVersion = context.functionVersion == '$LATEST' ? [nowDate.getMonth(), nowDate.getDate(), nowDate.getHours(), nowDate.getMinutes()].join('.') : context.functionVersion;
    }
    return awsServerlessExpress.proxy(server, event, context);
};

