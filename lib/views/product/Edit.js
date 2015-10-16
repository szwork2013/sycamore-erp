"use strict";

var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var SuppliersSelect = require("../../components/SuppliersSelect");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			locals: locals,
			menus: [],
			title: "Sycamore ERP - Edit product"
		};

		if (typeof locals != "undefined") {
			if (typeof locals.applicationName != "undefined") {
				state.applicationName = locals.applicationName;
			}
			if (typeof locals.menus != "undefined") {
				state.menus = locals.menus;
			}
		}

		return state;
	},
	render: function render() {
		var supplierValue = null;
		if (typeof this.state.locals.product.supplier != "undefined" && typeof this.state.locals.product.supplier._id != "undefined") {
			supplierValue = this.state.locals.product.supplier._id;
		}
		return React.createElement(
			Layout,
			{ title: this.state.title, locals: this.props.locals },
			React.createElement(Header, { applicationName: this.state.applicationName, applicationUrl: this.state.applicationUrl, menus: this.state.menus }),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"ul",
					{ className: "breadcrumbs" },
					React.createElement(
						"li",
						null,
						"Products"
					)
				)
			),
			React.createElement(
				"form",
				{ action: "/sycamore-erp/product/" + this.state.locals.product._id, encType: "application/x-www-form-urlencoded", method: "POST" },
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-10 columns" },
						React.createElement(
							"h1",
							null,
							"Edit product"
						)
					),
					React.createElement(
						"div",
						{ className: "large-2 columns" },
						React.createElement("input", { type: "submit", className: "right fancy radius button tiny", value: "Create" })
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"ul",
						{ "data-tab": "data-tab", role: "tablist", className: "tabs" },
						React.createElement(
							"li",
							{ role: "presentation", className: "tab-title active" },
							React.createElement(
								"a",
								{ href: "#general", role: "tab", tabIndex: "0", "aria-selected": "true", "aria-controls": "general" },
								"General"
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-4 columns" },
						React.createElement(
							"div",
							{ className: "tabs-content" },
							React.createElement(
								"section",
								{ role: "tabpanel", "aria-hidden": "false", id: "general", className: "content active" },
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement(
											"label",
											{ className: "right inline" },
											"Name"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { type: "text", name: "product[name]", value: this.state.locals.product.name })
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement(
											"label",
											{ className: "right inline" },
											"Supplier"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement(SuppliersSelect, { name: "product[supplier]", onChange: this.handleSupplierChange, value: supplierValue })
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement(
											"label",
											{ className: "right inline" },
											"Product Code"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { type: "text", name: "product[productCode]", value: this.state.locals.product.productCode })
									)
								),
								React.createElement(
									"div",
									{ className: "row" },
									React.createElement(
										"div",
										{ className: "large-4 columns" },
										React.createElement(
											"label",
											{ className: "right inline" },
											"Price"
										)
									),
									React.createElement(
										"div",
										{ className: "large-8 columns" },
										React.createElement("input", { type: "text", name: "product[price]", value: this.state.locals.product.price })
									)
								)
							)
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