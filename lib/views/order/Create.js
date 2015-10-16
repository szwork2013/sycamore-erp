"use strict";

var React = require("react");
var Layout = require("../Layout");
var Header = require("../../components/Header");

var CustomersSelect = require("../../components/CustomersSelect");
var PropertiesSelect = require("../../components/PropertiesSelect");
var ProductsSelect = require("../../components/ProductsSelect");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		var locals = this.props.locals;

		var state = {
			applicationName: "",
			menus: [],
			title: "Sycamore ERP - New order"
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
	handleCustomerChange: function handleCustomerChange(value) {},
	handlePropertyChange: function handlePropertyChange(value) {},
	handleProductChange: function handleProductChange(value) {},
	render: function render() {
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
						"Orders"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-10 columns" },
					React.createElement(
						"h1",
						null,
						"New order"
					)
				),
				React.createElement(
					"div",
					{ className: "large-2 columns" },
					React.createElement(
						"a",
						{ href: "/order/create", className: "right fancy radius button tiny" },
						React.createElement("i", { className: "in-button-icon fa fa-fw fa-plus" }),
						" Save"
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-6 columns" },
					React.createElement(
						"fieldset",
						null,
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-2 columns" },
								React.createElement(
									"label",
									{ className: "inline" },
									"Customer"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement(CustomersSelect, { name: "order[customer]", onChange: this.handleCustomerChange })
							),
							React.createElement(
								"div",
								{ className: "large-2 columns" },
								React.createElement("input", { className: "right fancy radius button tiny", type: "button", value: "New" })
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "large-6 columns" },
					React.createElement(
						"fieldset",
						null,
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-2 columns" },
								React.createElement(
									"label",
									{ className: "inline" },
									"Property"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement(PropertiesSelect, { name: "order[property]", onChange: this.handlePropertyChange })
							),
							React.createElement(
								"div",
								{ className: "large-2 columns" },
								React.createElement("input", { className: "right fancy radius button tiny", type: "button", value: "New" })
							)
						)
					)
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
									{ className: "table-cell large-1" },
									"Quantity"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-7" },
									"Product"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-4" },
									"Options"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "table-body" },
							React.createElement(
								"div",
								{ className: "table-row" },
								React.createElement(
									"div",
									{ className: "table-cell" },
									React.createElement("input", { type: "number" })
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									React.createElement(ProductsSelect, { name: "order[products][]", onChange: this.handleProductChange })
								),
								React.createElement("div", { className: "table-cell" })
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