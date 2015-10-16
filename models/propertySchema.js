var Mongoose = require("mongoose");

exports.propertySchema =  function() {
	return new Mongoose.Schema({
		customer:			 { type: Mongoose.Schema.Types.ObjectId, ref: "Customer" },
		name:				 { type: String }
	});
}