import * as React from "react";
import {renderToString} from "react-dom/server";
import { StaticRouter } from 'react-router';
import { Request } from 'express';

import { Controller, Req, Get } from "routing-controllers";
import Template from "../components/template";
import {Helmet} from "react-helmet";

import App from '../shared/app';

// @TODO: last
// import Main from '../components/home/Main';

@Controller()
export default class RouterController {
    @Get("/")
    @Get("/home")
    @Get("/my")
    // @Header("Cache-Control", "public, max-age=300")
    // @Header("Last-Modified", lastModified)
    async html(@Req() req: Request) {
    	console.log("req.url:::",req.url);
		let vOptions = Template.defaultViewOption(req);
		let initialData= {
			_zbuser: vOptions._zbuser,
            apis_host:vOptions.apis_host,
			static_host:vOptions.static_host
		};
		let context={};

        // let body = renderToString(<Main {...initialData} />);
        let body = renderToString(
            <StaticRouter location={req.url} context={context}>
                <App {...initialData}/>
            </StaticRouter>
        );
		const helmet = Helmet.renderStatic();

		let info={
			path:"home",
			component:"Main",
		};

		if(req.url.match("my")) {
            info.path="my";
            info.component="My";
		}

		return Template.render(body, helmet, info.path, info.component, vOptions, initialData);
	}
}


