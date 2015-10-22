var Mongoose = require("mongoose");

var orderItemSchema = Mongoose.Schema({
	product:				 { type: Mongoose.Schema.Types.ObjectId, ref: "Product" },
	quantity:				 { type: Number },
	price:					 { type: Number }
});

exports.orderSchema = function() {
	return new Mongoose.Schema({
		customer:			 { type: Mongoose.Schema.Types.ObjectId, ref: "Customer" },
		property:			 { type: Mongoose.Schema.Types.ObjectId, ref: "Property" },
		products:			 [orderItemSchema],
		subTotal:			 { type: Number },
		VAT:				 { type: Number },
		total:				 { type: Number }
	});
}