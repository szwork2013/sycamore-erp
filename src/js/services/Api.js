var request = require("superagent");

var Api = {
	getSuppliers: function(queryOptions, callback) {
		request
		.get("http://fusion-furniture-solutions.herokuapp.com/sycamore-erp/suppliers.json")
		.end(callback);
	}
};

exports = module.exports = Api;