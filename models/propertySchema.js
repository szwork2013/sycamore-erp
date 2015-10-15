var Mongoose = require("mongoose");

exports.propertySchema =  function() {
	return new Mongoose.Schema({
		name:				 { type: String }
	});
}