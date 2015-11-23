var Mongoose = require("mongoose");

exports.productVariationSchema = function() {
	return new Mongoose.Schema({
		metadata:						 { type: Mongoose.Schema.Types.Mixed },
		name:							 { type: String, unique: true, required: true },
		metaName:						 { type: String, unique: true, required: true },
		values: [
			{
				label:					 { type: String },
				value:					 { type: String }
			}
		]
	}, {
		collection: "productVariations"
	});
}