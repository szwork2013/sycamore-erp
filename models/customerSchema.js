var Mongoose = require("mongoose");

exports.customerSchema = function() {
	return new Mongoose.Schema({
		name:				 { type: String }
	});
}