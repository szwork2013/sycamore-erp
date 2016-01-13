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
		created:						 { type: Date, default: Date.now, index: true },
		updated:						 { type: Date, default: Date.now, index: true },
		dateAccepted:					 { type: Date, default: null },
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
		total:							 { type: Number },
		terms: {
			orderCorrectAgreed:			 { type: Boolean, default: false },
			propertyTidyAgreed:			 { type: Boolean, default: false },
			noticeAgreed:				 { type: Boolean, default: false },
			paymentAgreed:				 { type: Boolean, default: false }
		}
	}, {
		collection: "orders"
	});
}