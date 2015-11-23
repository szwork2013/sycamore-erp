var Mongoose = require("mongoose");

exports.customerSchema = function() {
	return new Mongoose.Schema({
		metadata:						 { type: Mongoose.Schema.Types.Mixed },
		name:							 { type: String },
		billingAddress: {
			line1:						 { type: String },
			line2:						 { type: String },
			line3:						 { type: String },
			line4:						 { type: String },
			postCode:					 { type: String }
		},
		telephone:						 { type: String },
		email:							 { type: String }
	}, {
		collection: "customers"
	});
};