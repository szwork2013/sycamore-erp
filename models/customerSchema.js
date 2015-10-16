var Mongoose = require("mongoose");

var addressSchema = Mongoose.Schema({
	Line1:	 							{ type: String },
	Line2:	 							{ type: String },
	Line3:	 							{ type: String },
	Line4:	 							{ type: String },
	postCode:	 						{ type: String },
	CountryCode:	 					{ type: String },
	CountryName:	 					{ type: String }
});

var contactSchema = Mongoose.Schema({
	Telephone:							{ type: String },
	FAX:								{ type: String },
	Mobile:								{ type: String },
	Website:							{ type: String }
});

var nameValueSchema = Mongoose.Schema({
	Name:								{ type: String },
	Value:								{ type: String }
});

exports.customerSchema = function() {
	return new Mongoose.Schema({
		Id:					 			{ type: Number, required: true },
		DisplayName:		 			{ type: String },
		Code:				 			{ type: String },
		Name:				 			{ type: String },
		Source:				 			{ type: Number },
		CreatedDate:		 			{ type: Date },
		LastUpdatedDate:	 			{ type: Date },
		IsRegisteredInEC:	 			{ type: Boolean },
		IsRegisteredOutsideEC:			{ type: Boolean },
		Note:				 			{ type: String },
		DiscountRate:		 			{ type: Number },
		ShowDiscount:		 			{ type: Boolean },
		VATNumber:			 			{ type: String },
		AutoIncludeVATNumber: 			{ type: Boolean },
		TotalPaidAmount:	 			{ type: Number },
		InvoicedNetAmount:	 			{ type: Number },
		InvoicedVATAmount:	 			{ type: Number },
		ReceivesWholesalePricing:		{ type: Boolean },
		DefaultNominalCode:	 			{ type: String },
		IsArchived:			 			{ type: Boolean },
		InvoiceCount:		 			{ type: Number },
		Currency:			 			{
			"Code":						{ type: String },
			"ExchangeRate":				{ type: Number },
			"DisplayOnRight":			{ type: Boolean },
			"Name":						{ type: String },
			"Symbol":					{ type: String }
		},
		DefaultCustomerReference: 		{ type: String },
		EmailTemplateNumber:			{ type: Number },
		OverrideInvoiceFileFormat: 		{ type: Boolean },
		InvoiceFileFormat: 				{ type: String },
		FirstInvoiceDate:				{ type: Date },
		LastInvoiceDate:				{ type: Date },
		UniqueEntityNumber:				{ type: String },
		AutomaticCreditControlEnabled:	{ type: Boolean },
		Contacts:						[contactSchema],
		Addresses: 						[addressSchema],
		UseCustomDeliveryAddress:		{ type: Boolean },
		DeliveryAddresses:				[addressSchema],
		CustomTextBoxes:				[nameValueSchema],
		CustomCheckBoxes:				[nameValueSchema],
		ApplyWithholdingTax:			{ type: Boolean },
		WithholdingTaxRate:				{ type: Number },
		WithholdingTaxReferences:		{ type: Number },
		OutstandingBalance:				{ type: Number },
		IsGoCardlessMandateSet:			{ type: Boolean },
		PaymentTerms:					{
			"Days":						{ type: Number },
			"Type":						{ type: String }
		}
	},{
		collection: "customers"
	});
}