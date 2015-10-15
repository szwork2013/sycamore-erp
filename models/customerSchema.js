var Mongoose = require("mongoose");

exports.customerSchema = new Mongoose.Schema({
	name:				 { type: String }
});