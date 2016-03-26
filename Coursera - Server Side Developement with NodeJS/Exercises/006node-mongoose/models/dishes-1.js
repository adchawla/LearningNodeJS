var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var dishSchema = new Schema({
		name : { type: String, required: true, unique:true },
		description: { type: String, required: true },
	}, {
		timestamps:true
	}
);

// the schema is uselss so far
// we need to create a model using it
var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes; 