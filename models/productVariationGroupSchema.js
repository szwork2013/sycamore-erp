var Mongoose = require("mongoose");

exports.productVariationGroupSchema = function() {
	return new Mongoose.Schema({
		metadata:						 { type: Mongoose.Schema.Types.Mixed },
		name:							 { type: String, unique : true, required : true },
		variations:						[{ type: Mongoose.Schema.Types.ObjectId, ref: "ProductVariation" }]
	}, {
		collection: "productVariationGroups"
	});
}