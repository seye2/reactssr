import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

import "reflect-metadata";
import { useExpressServer } from "routing-controllers";
import { ApigatewayMiddleware, EndcloseMiddleware, CustomErrorHandler } from './middle/middlewares';

import RouterController from "./controllers/Router";

// express
export const app = express();

// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let staticPath="./dev/client";

// static file serve
const staticOptions = {maxAge:'1y'};

if(process.env.NODE_ENV==="production") {
    staticPath="./functions/reactssr/client";
    if(process.env.NODE_STATUS==="deploy") {

        staticPath="./client";
    }
}

// only in dev mode
app.use('/static', express.static(staticPath, staticOptions));

// router
useExpressServer(app, {
    controllers: [ RouterController ],
	middlewares: [ ApigatewayMiddleware, EndcloseMiddleware, CustomErrorHandler],
	defaultErrorHandler: false
});
