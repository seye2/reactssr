// src/template.js
export default class Template {
	static render(body: string, helmet: any, path: string, componentName: string, vOptions: any, initialData: any): string {
		console.log(initialData);
		let running_mode = '';
		let api_host = '';
		let apis_host = '';
		let _zbuser = null;
		let tpl_version = '';
		let hashed_user_email = '';
        let static_host=initialData.static_host;

		return `<!DOCTYPE html>
	    <html lang="ko">
	    <head>
	      <meta charset="utf-8" />
	      <meta name="viewport" content="width=1140px" />
	      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
	      ${helmet.title.toString()}
	      <link href="${static_host}/index.css?vs=1234" rel="stylesheet" type="text/css" />
	      ${helmet.link.toString()}
	      ${helmet.style.toString()}
	      
	      <script>
	        
	        var r_mode = "${running_mode}";
	    
	        var api_host = "${api_host}";
	        var apis_host = "${apis_host}";
	        var tpl_host = "/Content/tpl/";
	        var tpl_version = "${tpl_version}";
	        var user_type_all = "${_zbuser!=null ? _zbuser['user_type'] : ''}";
	        var api_host_sms = null;
	        var static_host="${static_host}"
	        api_host_sms = "";
	        
	       </script>
	       ${helmet.script.toString()}
	    </head>
	    <body>  
	      
	      
				
	      <div id="root">${body}</div>
	      <script>
	      window.reactPath = {
	        path:"${path}",
	        componentName:"${componentName}",
	        initialData:'${JSON.stringify(initialData)}'
	      }
	      </script>
	      <script src="${static_host}/app.js"></script>
	    </body>
	    </html>
	  `;
	}

	static defaultViewOption(req: any): any {
		return {
			"env":req.ENV,
			"vscode": req.apiGatewayEvent.functionVersion.toString(),
			"apis_host": (req.apiGatewayEvent.stageVariables.apis_host || ""),
			"api_host": (req.apiGatewayEvent.stageVariables.api_host || ""),
            "static_host": (req.apiGatewayEvent.stageVariables.static_host || ""),
			"loginInfo": req.loginInfo
		}
	}


	static getLastModified(): string {
		if(process.env.timestamp) {
			let timestamp: any = process.env.timestamp;
			return new Date(parseInt(timestamp)*1000).toUTCString();
		} else {
			return (new Date()).toUTCString();
		}
	}
}


