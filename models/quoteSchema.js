var Mongoose = require("mongoose");

var quoteItemSchema = Mongoose.Schema({
	product:							 { type: Mongoose.Schema.Types.ObjectId, ref: "Product" },
	quantity:							 { type: Number },
	subTotal:							 { type: Number },
	VAT:								 { type: Number },
	total:								 { type: Number }
});

exports.quoteSchema = function() {
	return new Mongoose.Schema({
		metadata:						 { type: Mongoose.Schema.Types.Mixed },
		status:							 { type: String, default: "Draft" },
		customer:						 { type: Mongoose.Schema.Types.ObjectId, ref: "Customer" },
		property:						 { type: Mongoose.Schema.Types.ObjectId, ref: "Property" },
		products:						 [ quoteItemSchema ],
		subTotal:						 { type: Number },
		VAT:							 { type: Number },
		total:							 { type: Number }
	}, {
		collection: "quotes"
	});
}