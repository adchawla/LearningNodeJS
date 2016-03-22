var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL to mongodb
var url = 'mongodb://localhost:27017/conFusion';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
	assert.equal(err, null);
	console.log("Connected correctly to server");

	var collection = db.collection("dishes");

	// insert a document into the collection
	collection.insertOne(
		{name:"Rasgulla", description:"test"},
		function(err, result) {
			assert.equal(err, null);
			console.log("AfterInsert:");
			console.log(result.ops);
			
			collection.find({}).toArray( function(err, docs) {
				assert.equal(err, null);
				console.log("Found:");
				console.log(docs);


				db.dropCollection("dishes", function(err, result){
					assert.equal(err, null);
					db.close();
				});
			});
		}
	);
});