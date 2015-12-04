var request = require('request');

function Odata1c(url, login, pass) {
	this.url = url;
	this.login = login;
	this.pass = pass;
	this.options = {
		url: url + '/odata/standard.odata/',
		headers: { 'Accept': 'application/json' }
	}
	this.getStandardObjects = function () {
		request.get({ url: this.options.url + '$metadata', header: this.options.headers }, function (error, response, body) {
			return JSON.parse(body);
		})
			.auth(this.login, this.pass, false)
	}
	this.getCatalog = function (object1c) {
		request.get({ url: this.options.url +'/Catalog_'+encodeURI(object1c), headers: this.options.headers }, function (error, response, body) {
			return JSON.parse(body);
		})
			.auth(this.login, this.pass, false)
	}
	this.getDocument = function (object1c) {
		request.get({ url: this.options.url +'/Document_'+encodeURI(object1c), headers: this.options.headers }, function (error, response, body) {
			return JSON.parse(body);
		})
			.auth(this.login, this.pass, false)
	}
	this.getConstant= function (object1c) {
		request.get({ url: this.options.url +'/Constant_'+encodeURI(object1c), headers: this.options.headers }, function (error, response, body) {
			return JSON.parse(body);
		})
			.auth(this.login, this.pass, false)
	}	

	this.post = function () { }
	this.delete = function () { }
	this.patch = function () { }
}

var odata = new Odata1c('http://acsdc03/acsour1', 'ws', 'ws');
console.log(odata.getCatalog("ВнешниеОбработки"));