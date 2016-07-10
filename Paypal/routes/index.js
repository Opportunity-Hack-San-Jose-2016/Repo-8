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
          res.send(err);
        } else {
          var connection=conn.login(config.username, config.password, function(err, connRes) {
            if (err) { return console.error(err); }
            else {
              conn.query(query, function (err, mTypes) {
                if (err) {
                  console.error(err);
                  res.send(err);
                } else {
                  console.log(res1);
                  res.render('index', {'countries':countries, 'memberTypes':mTypes});
                }
              });
            }
          });
        }
      });
    }
  });

};