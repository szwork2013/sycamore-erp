var Mongoose = require("mongoose");

var orderItemSchema = Mongoose.Schema({
	product:							 { type: Mongoose.Schema.Types.ObjectId, ref: "Product" },
	quantity:							 { type: Number },
	subTotal:							 { type: Number },
	VAT:								 { type: Number },
	total:								 { type: Number }
});

exports.orderSchema = function() {
	return new Mongoose.Schema({
		metadata:						 { type: Mongoose.Schema.Types.Mixed },
		status:							 { type: String, default: "Draft" },
		billing: {
			customerName:				 { type: String },
			companyName:				 { type: String },
			telephone:					 { type: String },
			email:						 { type: String },
			address: {
				line1:					 { type: String },
				line2:					 { type: String },
				line3:					 { type: String },
				line4:					 { type: String },
				postCode:				 { type: String }
			}
		},
		delivery: {
			date:						 { type: Date },
			telephone:					 { type: String },
			accessArrangements:			 { type: String },
			address: {
				line1:					 { type: String },
				line2:					 { type: String },
				line3:					 { type: String },
				line4:					 { type: String },
				postCode:				 { type: String }
			}
		},
		products: [
			{
				name:					 { type: String },
				quantity:				 { type: Number },
				subTotal:				 { type: Number },
				VAT:					 { type: Number },
				total:					 { type: Number }
			}
		],
		discounts: [
			{
				name:					 { type: String },
				quantity:				 { type: Number },
				subTotal:				 { type: Number },
				VAT:					 { type: Number },
				total:					 { type: Number }
			}
		],
		additionalCharges: [
			{
				name:					 { type: String },
				quantity:				 { type: Number },
				subTotal:				 { type: Number },
				VAT:					 { type: Number },
				total:					 { type: Number }
			}
		],
		subTotal:						 { type: Number },
		VAT:							 { type: Number },
		total:							 { type: Number }
	}, {
		collection: "orders"
	});
}