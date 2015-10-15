var Mongoose = require("mongoose");

exports.orderSchema = new Mongoose.Schema({
	customer:			 { type: Schema.Types.ObjectId, ref: "Customer" },
	products:			[{ type: Schema.Types.ObjectId, ref: "Product" }]
});