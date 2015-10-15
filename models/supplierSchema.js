var Mongoose = require("mongoose");

exports.supplierSchema =  function() {
	return new Mongoose.Schema({
		name:				 { type: String }
	});
}