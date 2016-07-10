var http = require('http');
var URL = require('url');
var jsforce = require('jsforce');
var config=require('../config/config.json');

/*
 * GET users listing.
 */

exports.list = function(req, res){
	res.send("respond with a resource");
};

exports.home=function(req,res){

};

/*exports.login=function(req,res){
	console.log(config);
	var query = "SELECT Id, Name FROM Account";
	var conn = new jsforce.Connection();
	/!*var connection=conn.login(config.username,config.password, function(err, res) {
		if (err) { return console.error(err); }
		else{
			console.log("Connection Successful");
			conn.query(query, function(err, res1) {
				if (err) { return console.error(err); }
				console.log(res1);
				return res1;
			});
		}
	});*!/
	res.render("home");
};*/

exports.login = function(req, res){
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
					res.render('home', { 'countries': res1 });
				}
			});
		}
	});

};
