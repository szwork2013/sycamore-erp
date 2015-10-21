"use strict";

var React = require("react");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		return {};
	},
	render: function render() {
		var products = this.props.locals.products;
		var pageTitle = "Products";

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement(
					"a",
					{ href: "/sycamore-erp/product", className: "right fancy radius button tiny" },
					React.createElement("i", { className: "in-button-icon fa fa-fw fa-plus" }),
					" Create"
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-12 columns" },
					React.createElement(
						"div",
						{ className: "table" },
						React.createElement(
							"div",
							{ className: "table-head" },
							React.createElement(
								"div",
								{ className: "table-row" },
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Supplier"
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Name"
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Product Code"
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Price"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Actions"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "table-body" },
							products.map(function (product) {
								var supplierName = "";
								if (typeof product.supplier != "undefined" && typeof product.supplier.name != "undefined") {
									supplierName = product.supplier.name;
								}
								return React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										supplierName
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.name
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.productCode
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.price
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										React.createElement(
											"a",
											{ href: "/sycamore-erp/product/" + product._id },
											React.createElement("i", { className: "icon-button fa fa-fw fa-pencil" })
										),
										React.createElement(
											"a",
											{ href: "/sycamore-erp/product/" + product._id + "/edit.html" },
											React.createElement("i", { className: "icon-button fa fa-fw fa-pencil" })
										),
										React.createElement(
											"a",
											{ href: "/sycamore-erp/product/" + product._id + "/delete" },
											React.createElement("i", { className: "icon-button fa fa-fw fa-trash-o" })
										)
									)
								);
							})
						)
					)
				)
			)
		);
	}
});

if (process.browser) {
	React.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;