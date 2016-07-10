var http = require('http');
var URL = require('url');
var jsforce = require('jsforce');
var config = require('../config/config.json');


exports.countriesList=function(req,res){
	var query = "select name from location__c"
	console.log(query);
	var conn = new jsforce.Connection();
	var connection=conn.login(config.username, config.password, function(err, connRes) {
		  if (err) { return console.error(err); }
		  else{
			  console.log("Connection Successful");
			  conn.query(query, function(err, res1) {
				    if (err) {
				    	console.error(err); 
				    	res.send(err);
				    } else {
				    	console.log(res1);
				    	res.send(res1);
				    }
				  });
		  }
		  });
}

exports.memberTypeList=function(req,res){
	var query = "select membership_type__c from account group by membership_type__c"
	console.log(query);
	var conn = new jsforce.Connection();
	var connection=conn.login(config.username, config.password, function(err, connRes) {
		  if (err) { return console.error(err); }
		  else{
			  console.log("Connection Successful");
			  conn.query(query, function(err, res1) {
				    if (err) {
				    	console.error(err); 
				    	res.send(err);
				    } else {
				    	console.log(res1);
				    	res.send(res1);
				    }
				  });
		  }
		  });
}

exports.search=function(req,res){
	//var query = "SELECT Id, Name FROM Account";
	//get request parameters
	var country = req.query.country;
	var memberType = req.query.memberType;
	var financialServices = req.query.financialServices; //YES or NO or empty
	var capacityNonFinServices = req.query.capacityNonFinServices; //YES or NO or empty
	var deliveryMechanism = req.query.deliveryMechanism; //YES or NO or empty
	
	//TODO: return error message if country is not present in the req
	var countryQuery = "";
	if(country !== undefined && country !== "") {
		countryQuery = "country__C like '"+country+"'";
	}
	
	var memberTypeQuery = "";
	if(memberType !== undefined && memberType !== "") {
		memberTypeQuery = " and membership_type__c like '"+memberType+"'";
	}
	
	var financialServicesQuery = "";
	if(financialServices !== undefined && financialServices !== "" && financialServices === "YES") {
		financialServicesQuery = " and instrument__C != ''";
	}
	
	var capacityNonFinServicesQuery = "";
	if(capacityNonFinServices !== undefined && capacityNonFinServices !== "" && capacityNonFinServices === "YES") {
		capacityNonFinServicesQuery = "and nonfinancial_support__C != ''";
	}

	var deliveryMechanismQuery = "";
	if(deliveryMechanism !== undefined && deliveryMechanism !== "" && deliveryMechanism === "YES") {
		deliveryMechanismQuery = "and capdevs_what_does_your_int_consist_of__C != ''";
	}
	
	var query = "select id,name,membership_type__c,(select country__C,Stage__c,Sector_or_Impact_Focus__c,Stakeholders_or_Business__c,Instrument__c,NonFinancial_Support__c,CapDevs_What_does_your_int_consist_of__C from ecosystem_mapping__r where "+countryQuery+")" +
			"from account where id in (select account_name__c from ecosystem_mapping__c where "+countryQuery + financialServicesQuery + capacityNonFinServicesQuery + deliveryMechanismQuery+")"+memberTypeQuery;
	
	console.log(query);
	
	var conn = new jsforce.Connection();
	var connection=conn.login(config.username, config.password, function(err, connRes) {
		  if (err) { return console.error(err); }
		  else{
			  console.log("Connection Successful");
			  conn.query(query, function(err, res1) {
				    if (err) {
				    	console.error(err); 
				    	res.send(err);
				    } else {
				    	console.log(res1);
				    	res.send(res1);
				    }
			  });
		  }
	});
};

//TODO: need to add Geographical focus areas
exports.organizationDetails=function(req,res) {
	var organizationId = req.query.organizationId;
	if(organizationId === undefined || organizationId === "") {
		res.send("error: send ID");
	}
	//select name,impact_focus__c,membership_type__c,website,description,sector_focus__c,headquarters_city__c,headquarters_country__c from account where id = ''
	var query = "select name,impact_focus__c,membership_type__c,website,description,sector_focus__c,headquarters_city__c,headquarters_country__c from account where id = '"+organizationId+"'";
		console.log(query);
		var conn = new jsforce.Connection();
		var connection=conn.login(config.username, config.password, function(err, connRes) {
			if (err) { return console.error(err); }
			else{
				console.log("Connection Successful");
				conn.query(query, function(err, res1) {
					if (err) {
						console.error(err);
						res.send(err);
					} else {
						console.log(res1);
						res.send(res1);
					}
				});
			}
		});
}
