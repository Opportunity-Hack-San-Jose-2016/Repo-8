var http = require('http');
var URL = require('url');
var jsforce = require('jsforce');

var login='';
var password='';
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.home=function(req,res){
	
};

exports.login=function(req,res){
	var query = "SELECT Id, Name FROM Account";
	var conn = new jsforce.Connection();
	var connection=conn.login(login,password, function(err, res) {
		  if (err) { return console.error(err); }
		  else{
			  console.log("Connection Successful");
			  conn.query(query, function(err, res1) {
				    if (err) { return console.error(err); }
				    console.log(res1);
				    return res1;
				  });
		  }
		  });
};
