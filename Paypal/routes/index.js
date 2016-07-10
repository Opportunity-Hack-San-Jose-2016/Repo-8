var http = require('http');
var URL = require('url');
var jsforce = require('jsforce');
var config = require('../config/config.json');

/*
 * GET home page.
 */
exports.index = function(req, res){
  var query = "select name from location__c"
  console.log(query);
  var conn = new jsforce.Connection();
  var connection=conn.login(config.username, config.password, function(err, connRes) {
    if (err) { return console.error(err); }
    else{
      console.log("Connection Successful");
      conn.query(query, function(err, countries) {
        if (err) {
          console.error(err);
          conn.logout();
          res.send(err);
        } else {
          var mQuery = "select membership_type__c from account group by membership_type__c";
          conn.query(mQuery, function (err, mTypes) {
            if (err) {
              console.error(err);
              conn.logout();
              res.send(err);
            } else {
              console.log(mTypes);
              conn.logout();
              res.render('index', {'countries':countries, 'memberTypes':mTypes});
            }
          });
        }
      });
    }
  });

};