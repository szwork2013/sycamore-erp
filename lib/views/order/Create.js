"use strict";

var React = require("react");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");
var CustomersSelect = require("../../components/CustomersSelect");
var PropertiesSelect = require("../../components/PropertiesSelect");
var ProductsSelect = require("../../components/ProductsSelect");
var ApplicationActions = require("../../actions/ApplicationActions");
var OrderStore = require("../../stores/OrderStore");

function getOrderFromStore() {
	return {
		order: OrderStore.getOrder()
	};
}

var View = React.createClass({
	displayName: "View",

	_onChange: function _onChange() {
		this.setState(getOrderFromStore());
	},
	componentDidMount: function componentDidMount() {
		OrderStore.addChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return getOrderFromStore();
	},
	handleCustomerChange: function handleCustomerChange(value) {
		console.log(value);
	},
	handlePropertyChange: function handlePropertyChange(value) {
		console.log(value);
	},
	handleProductChange: function handleProductChange(value) {
		console.log(value);
	},
	render: function render() {
		var pageTitle = "New order";

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement("input", { type: "submit", className: "right fancy radius button tiny", value: "Save" })
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
									"Customer Name"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement("input", { type: "text", disabled: "disabled", value: "" })
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
									"Company Name"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement("input", { type: "text", disabled: "disabled", value: "" })
							)
						),
						React.createElement(
							"fieldset",
							null,
							React.createElement(
								"label",
								null,
								"Billing Address"
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
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
									"label",
									{ className: "right inline" },
									"Telephone"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement("input", { type: "text", disabled: "disabled", value: "" })
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
									"Email"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement("input", { type: "text", disabled: "disabled", value: "" })
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
						),
						React.createElement(
							"fieldset",
							null,
							React.createElement(
								"label",
								null,
								"Property Address"
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
								)
							),
							React.createElement(
								"div",
								{ className: "row" },
								React.createElement(
									"div",
									{ className: "large-4 columns" },
									React.createElement("label", { className: "right inline" })
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									React.createElement("input", { type: "text", disabled: "disabled", value: "" })
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
									"label",
									{ className: "right inline" },
									"Access Arrangements"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement("textarea", null)
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
									"Access Telephone"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement("input", { type: "text", disabled: "disabled", value: "" })
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
									{ className: "table-cell large-10" },
									"Product"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Quantity"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Price"
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
									React.createElement(ProductsSelect, { name: "order[products][]", onChange: this.handleProductChange })
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									React.createElement("input", { type: "number" })
								),
								React.createElement("div", { className: "table-cell" })
							)
						),
						React.createElement(
							"div",
							{ className: "table-foot" },
							React.createElement(
								"div",
								{ className: "table-row" },
								React.createElement(
									"div",
									{ className: "table-cell" },
									" "
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Sub Total"
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									this.state.order.subTotal
								)
							),
							React.createElement(
								"div",
								{ className: "table-row" },
								React.createElement(
									"div",
									{ className: "table-cell" },
									" "
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									"VAT"
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									this.state.order.VAT
								)
							),
							React.createElement(
								"div",
								{ className: "table-row" },
								React.createElement(
									"div",
									{ className: "table-cell" },
									" "
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									React.createElement(
										"strong",
										null,
										"Total"
									)
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									this.state.order.total
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