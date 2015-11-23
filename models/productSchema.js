var Mongoose = require("mongoose");

exports.productSchema = function() {
	return new Mongoose.Schema({
		metadata:						 { type: Mongoose.Schema.Types.Mixed },
		productType:					 { type: String, enum: [ "Simple", "Configurable", "Package" ], default: "Simple", required: true },
		productVariationGroup:			 { type: Mongoose.Schema.Types.ObjectId, ref: "ProductVariationGroup" },
		supplier:						 { type: Mongoose.Schema.Types.ObjectId, ref: "Supplier" },
		name:							 { type: String, unique: true, required: true },
		productCode:					 { type: String, unique: true, required: true },
		price:							 { type: Number, required: true },
		products:						[{ type: Mongoose.Schema.Types.ObjectId, ref: "Product" }]
	}, {
		collection: "products"
	});
};