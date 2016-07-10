var MongoClient = require('mongodb').MongoClient;
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.getList=function(req,res){
	console.log("HI");
	MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
		  if(err) { return console.dir(err); }
		  
		  var collection = db.collection('users');
		  collection.find({}).toArray(function(err, docs) {
			 //assert.equal(2, docs.length);
			  console.dir(docs[0]);
		        res.send({"data":docs}  );
		    });
	
/*	var data=db.collection('contacts').group({
	    "key": {
	        "Company": true
	    },
	    "initial": {
	        "countstar": 0
	    },
	    "reduce": function(obj, prev) {
	        if (true != null){ if (true instanceof Array) prev.countstar += true.length;}
	        else {prev.countstar++;}
	    },
	    "cond": {
	        "LCA_CASE_EMPLOYER_NAME": "DELOITTE CONSULTING LLP"
	    }
	});
	console.log("datas : "+data);
	res.render('index', {
        "userlist" : data,"title":"express"	        });*/
	});
};
exports.getValues=function(req,res){
	console.log("in");
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		  if(err) { return console.dir(err); }
		  var collection = db.collection('data');
		  collection.aggregate([
		                          {        
		                            $group: {
		                               _id: {
		                                       Company:"LCA_CASE_EMPLOYER_NAME",
		                                       Dates: {$substr:["$LCA_CASE_SUBMIT",6,10]}
		                                   },         
		                               count: { $sum: 1 }
		                            },
		                         },
		                          { $sort: { Dates: 1 } },
		                          {$limit: 10}
		                       ]).toArray(function(err, data) {
		              			 //assert.equal(2, docs.length);
		             			  //.dir(data[0]);
		             		        res.send(data);
		             		    });
	});
};

exports.getValuesbackup=function(req,res){
	console.log("in");
	MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
		  if(err) { return console.dir(err); }
		  var collection = db.collection('data');
		  collection.aggregate([
		                         { $match: {$and: [ {STATUS: { $in : ['CERTIFIED','CERTIFIED-WITHDRAWN']},
		                        	 LCA_CASE_EMPLOYER_NAME:'OPTIVER US LLC'}]}},
		                         {        
		                            $group: {
		                               _id: {
		                                       Company:"LCA_CASE_EMPLOYER_NAME",
		                                       Dates: {$substr:["$LCA_CASE_SUBMIT",6,10]}
		                                   },         
		                               count: { $sum: 1 }
		                            },
		                            
		                         },
		                          { $sort: { Dates: 1 } }


		                       ]).toArray(function(err, data) {
		              			 //assert.equal(2, docs.length);
		             			  console.dir(data[0]);
		             		        res.send(data);
		             		    });
	});
	
	var data=
	
	[
		{
			
			"year": "2009",			
			"IBM": 8578,
			"Google": 26112,
			"Apple": 32203,
			"Amazon": 58973
		},
		{
		
			"year": "2010",
			
			"IBM": 5080,
			"Google": 30522,
			"Apple": 27568,
			"Amazon": 55103
		},
		{
		
			"year": "2011",
			
			"IBM": 11900,
			"Google": 29831,
			"Apple": 23297,
			"Amazon": 60126
		},
		{
			
			"year": "2013",			
			"IBM": 5600,
			"Google": 34439,
			"Apple": 15700,
			"Amazon": 63606
		},
		{
		
			"year": "2012",			
			"IBM": 4100,
			"Google": 23025,
			"Apple": 21176,
			"Amazon": 57539
		},
		
		{
		
			"year": "2014",			
			"IBM": 4100,
			"Google": 43897,
			"Apple": 12075,
			"Amazon": 61875
		
		}
	];
	
	console.log("sending");
	//res.send(data);
	
};

exports.jsontest=function(req,res){

	var results = [ 
	               {
	                   "_id" : {
	                       "LCA_CASE_EMPLOYER_NAME" : "EBAY INC.",
	                       "Dates" : "2014"
	                   },
	                   "count" : 460.0000000000000000,
	                   "Average_Sal" : 121864.9276304347600000
	               }, 
	               {
	                   "_id" : {
	                       "LCA_CASE_EMPLOYER_NAME" : "EBAY INC.",
	                       "Dates" : "2013"
	                   },
	                   "count" : 595.0000000000000000,
	                   "Average_Sal" : 119745.9324705882500000
	               }, 
	               {
	                   "_id" : {
	                       "LCA_CASE_EMPLOYER_NAME" : "EBAY INC.",
	                       "Dates" : "2009"
	                   },
	                   "count" : 93.0000000000000000,
	                   "Average_Sal" : 106827.8036559140000000
	               }, 
	               {
	                   "_id" : {
	                       "LCA_CASE_EMPLOYER_NAME" : "EBAY INC.",
	                       "Dates" : "2012"
	                   },
	                   "count" : 374.0000000000000000,
	                   "Average_Sal" : 116759.3002139037400000
	               }, 
	               {
	                   "_id" : {
	                       "LCA_CASE_EMPLOYER_NAME" : "EBAY INC.",
	                       "Dates" : "2011"
	                   },
	                   "count" : 537.0000000000000000,
	                   "Average_Sal" : 110969.6665735568200000
	               }, 
	               {
	                   "_id" : {
	                       "LCA_CASE_EMPLOYER_NAME" : "EBAY INC.",
	                       "Dates" : "2010"
	                   },
	                   "count" : 279.0000000000000000,
	                   "Average_Sal" : 108318.4943727598700000
	               }
	           ];
	
	res.send(jsonFormat(results));
};

function jsonFormat(results) {
	var reqJson = '[';
	var jsonLength = results.length;
	var idLength = Object.keys(results[0]._id).length;
	var otherLength = Object.keys(results[0]).length;

	for (var i=0;i<jsonLength;i++) {
		
		reqJson += '{';
		
		for (var j=0;j<idLength;j++) {
			reqJson += '"' +Object.keys(results[i]._id)[j] +'":"' +results[i]._id[Object.keys(results[i]._id)[j]] +'"';
			if(j !== idLength-1) {
				reqJson += ',';
			}
		}

		for (var k=1;k<otherLength;k++) {
			reqJson += ',"' +Object.keys(results[i])[k] +'":"' +results[i][Object.keys(results[i])[k]] +'"';
			/*if(k !== otherLength-1) {
				reqJson += ',';
			}*/
		}
		
		if(i !== results.length-1) {
			reqJson += '},';
		}
	}

	reqJson += '}]';

	console.log(reqJson);

	var finalJson = JSON.parse(reqJson);
	
	return finalJson;
}