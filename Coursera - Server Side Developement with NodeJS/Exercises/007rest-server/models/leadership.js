var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var leadershipSchema = new Schema({
		name : { type:String, required:true },
		image: { type:String, required:true },
		designation: { type:String, required:true, unique:true },
		abbr: { type:String, required:true, unique:true },
		description: { type: String, required: true },
	}, {
		timestamps:true
	}
);

// the schema is uselss so far
// we need to create a model using it
var Leaders = mongoose.model('leader', leadershipSchema);

module.exports = Leaders; 