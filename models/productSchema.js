var Mongoose = require("mongoose");

exports.productSchema =  function() {
	return new Mongoose.Schema({
		supplier:			 { type: Mongoose.Schema.Types.ObjectId, ref: "Supplier" },
		name:				 { type: String },
		productCode:		 { type: String },
		price:				 { type: Number }
	});
}