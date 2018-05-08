import * as mockApiGatewayEvent from '../../api-gateway-event.json';
import {Middleware, ExpressMiddlewareInterface, ExpressErrorMiddlewareInterface} from "routing-controllers";

// lambda에서 apigateway 실행 환경에 따른 값 설정.
@Middleware({ type: "before" })
export class ApigatewayMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err: any) => any): void {
    	let apiGatewayEvent: any = request.headers['x-apigateway-event'] ? JSON.parse(decodeURIComponent(request.headers['x-apigateway-event'] as string)) : mockApiGatewayEvent;
		if(apiGatewayEvent.functionVersion=='#LATEST') {
			let nowDate = new Date();
            apiGatewayEvent.functionVersion = [nowDate.getMonth()+1, nowDate.getDate(), nowDate.getHours(), nowDate.getMinutes(), nowDate.getSeconds(), nowDate.getMilliseconds()].join('.');
		}

		request.apiGatewayEvent = apiGatewayEvent;
		request.ENV=process.env.NODE_ENV;

		// 설정된 경우 콘솔 로그.
		if (apiGatewayEvent.stageVariables && apiGatewayEvent.stageVariables.consoleEvent == 'Y') {
			console.log(JSON.stringify(apiGatewayEvent, null, 2));
		}

		// db 초기화
		// rds.init(apiGatewayEvent.stageVariables);

		next(null);
    }
}

@Middleware({ type: "after" })
export class EndcloseMiddleware implements ExpressMiddlewareInterface {
    use(request: any, response: any, next: (err: any) => any): void {
	    // rds.end();
		next(null);
    }

}

@Middleware({ type: "after" })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {

    error(error: any, request: any, response: any, next: (err: any) => any) {
    	if(error.httpCode) {
    		console.log(error);
			response.status(error.httpCode).send(error.message || error.name);
			next(null);
		} else {
			console.log(error);


		}
    }
}
