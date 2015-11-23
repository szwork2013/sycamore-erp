var Mongoose = require("mongoose");

exports.propertySchema = function() {
	return new Mongoose.Schema({
		metadata:						 { type: Mongoose.Schema.Types.Mixed },
		customer:						 { type: Mongoose.Schema.Types.ObjectId, ref: "Customer" },
		address: {
			line1:						 { type: String },
			line2:						 { type: String },
			line3:						 { type: String },
			line4:						 { type: String },
			postCode:					 { type: String }
		},
		telephone:						 { type: String },
		accessArrangements:				 { type: String }
	});
}