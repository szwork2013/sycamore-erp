var Mongoose = require("mongoose");

exports.orderSchema =  function() {
	return new Mongoose.Schema({
		customer:			 { type: Mongoose.Schema.Types.ObjectId, ref: "Customer" },
		products:			[{ type: Mongoose.Schema.Types.ObjectId, ref: "Product" }]
	});
}