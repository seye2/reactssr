// zbee.js
// http://stackoverflow.com/questions/13478303/correct-way-to-use-modernizr-to-detect-ie
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "Other";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";

		this.mobile = false;
		this.mobOS = this.osCheck(navigator.userAgent);
		if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			this.mobile = true;
		}


		var is_vega2 = navigator.userAgent.indexOf("Chrome") == -1 && navigator.userAgent.indexOf("IM-A830S") != -1;
		var is_naver = navigator.userAgent.indexOf("NAVER") != -1;
		var is_chrome30 = navigator.userAgent.indexOf("Chrome/30.0.0.0") != -1;

		this.unsupported = is_chrome30 && this.mobile;
	},

	osCheck: function (data) {
		if (/Android/i.test(data)) {
			return 'android';
		} else if (/iPad|iPod|iPhone/i.test(data)) {
			return 'ios';
		} else {
			return ''
		}
	},

	searchString: function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;

			if (dataString.indexOf(data[i].subString) !== -1) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) {
			return;
		}

		var rv = dataString.indexOf("rv:");
		if (this.versionSearchString === "Trident" && rv !== -1) {
			return parseFloat(dataString.substring(rv + 3));
		} else {
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		}
	},

	dataBrowser: [
		{ string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
		{ string: navigator.userAgent, subString: "MSIE", identity: "IE" },
		{ string: navigator.userAgent, subString: "Trident", identity: "IE" },
		{ string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
		{ string: navigator.userAgent, subString: "Safari", identity: "Safari" },
		{ string: navigator.userAgent, subString: "Opera", identity: "Opera" }
	]
};

BrowserDetect.init();
