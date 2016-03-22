var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbOperations = require('./operations');
// Connection URL to mongodb
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	console.log("Connected correctly to server");

	dbOperations.insertDocument(
		db,
		{name:"Vadonut", description: "Test"},
		"dishes",
		function(result) {
			console.log(result.ops);
			dbOperations.findDocuments(db, "dishes", function(docs) {
				console.log(docs);
				dbOperations.updateDocument(db, {name:"Vadonut"}, {description:"updated Test"}, "dishes",
				function(result){
					console.log(result.result);
					dbOperations.findDocuments(db, "dishes", function(docs) {
						console.log(docs);
						db.dropCollection("dishes", function(result){
							console.log(result);
							db.close();
						});
					});
				});
			});
		}
	);
});