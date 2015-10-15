var Mongoose = require("mongoose");

exports.productSchema = new Mongoose.Schema({
	supplier:			 { type: Schema.Types.ObjectId, ref: "Supplier" },
	name:				 { type: String },
	productCode:		 { type: String },
	price:				 { type: Number }
});