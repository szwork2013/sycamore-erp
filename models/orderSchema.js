var Mongoose = require("mongoose");

exports.orderSchema =  function() {
	return new Mongoose.Schema({
		customer:			 { type: Schema.Types.ObjectId, ref: "Customer" },
		products:			[{ type: Schema.Types.ObjectId, ref: "Product" }]
	});
}