var request = require('request');

function Odata1c(url, login, pass) {
	this.url = url;
	this.login = login;
	this.pass = pass;
	this.options = {
		url: url + '/odata/standard.odata/',
		headers: { 'Accept': 'application/json' }
	}
	this.getStandardObjects = function (callBackFunc) {
		request.get({ url: this.options.url + '$metadata', header: this.options.headers }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callBackFunc(JSON.parse(body));
			}else{
				callBackFunc(error);
			}
		})
			.auth(this.login, this.pass, false)
	}
	this.getCatalog = function (object1c, callBackFunc) {
		request.get({ url: this.options.url +'/Catalog_'+encodeURI(object1c), headers: this.options.headers }, function (error, response, body) {
			if (!error && response.statusCode == 200) {					
                       callBackFunc(JSON.parse(body));
			}else{
				callBackFunc(error);
			}
		})
			.auth(this.login, this.pass, false)
	}
	this.getDocument = function (object1c, callBackFunc) {
		request.get({ url: this.options.url +'/Document_'+encodeURI(object1c), headers: this.options.headers }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callBackFunc(JSON.parse(body));
			}else{
				callBackFunc(error);
			}
		})
			.auth(this.login, this.pass, false)
	}
	this.getConstant= function (object1c, callBackFunc) {
		request.get({ url: this.options.url +'/Constant_'+encodeURI(object1c), headers: this.options.headers }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callBackFunc(JSON.parse(body));
			}else{
				callBackFunc(error);
			}
		})
			.auth(this.login, this.pass, false)
	}	
    this.getInformationRegisters= function (object1c, callBackFunc) {
		request.get({ url: this.options.url +'/InformationRegister_'+encodeURI(object1c), headers: this.options.headers }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				callBackFunc(JSON.parse(body));
			}else{
				callBackFunc(error);
			}
		})
			.auth(this.login, this.pass, false)
	}	

    
}

getPaySlip = function(id,date,url,login,pass){
    this.date=date;
    this.odata = new Odata1c(url, login, pass);
    this.odata.getCatalog("СотрудникиОрганизаций?$filter=Code eq '"+id+"'", function(result){this.getData(result.value[0].Физлицо_Key)});
    this.getData=function(guid){
      this.odata.getDocument("ФормированиеДанныхДляВебСервиса1СБитрикс?$filter=ПериодРегистрации eq datetime'"+this.date+"'",
        function(result){
                for(var i in result.value[0].ФизическиеЛица){
                    if(result.value[0].ФизическиеЛица[i].ФизЛицо_Key==guid){
                        console.log(new Buffer(result.value[0].ФизическиеЛица[i].РасчетныеЛистки_Base64Data,'base64').toString());
                    }
                    
                }    
      });
}
}
//getPaySlip('0000000000','2015-12-01T00:00:00','','','');
exports.getPaySlip = getPaySlip;


