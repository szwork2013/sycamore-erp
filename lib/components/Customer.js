"use strict";

var React = require("react");

var CustomerStore = require("../stores/CustomerStore");

function getCustomerFromStore(customer) {
	return {
		customer: CustomerStore.getCustomer(customer)
	};
}

var Customer = React.createClass({
	displayName: "Customer",

	_onChange: function _onChange() {
		this.setState(getCustomerFromStore());
	},
	componentDidMount: function componentDidMount() {
		CustomerStore.addListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		var customer;

		if (typeof this.props.customer != "undefined") {
			customer = this.props.customer;
		}

		return getCustomerFromStore(customer);
	},
	render: function render() {
		var customer = this.state.customer;

		var disabled = false;
		if (this.props.editable) {
			disabled = true;
		}

		return React.createElement(
			"div",
			null,
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
					React.createElement("input", { type: "text", disabled: disabled, value: customer.name })
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
						React.createElement(
							"label",
							{ className: "right inline" },
							"Line 1"
						)
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: disabled, value: customer.billingAddress.line1 })
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
							"Line 2"
						)
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: disabled, value: customer.billingAddress.line2 })
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
							"Line 3"
						)
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: disabled, value: customer.billingAddress.line3 })
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
							"Line 4"
						)
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: disabled, value: customer.billingAddress.line4 })
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
							"PostCode"
						)
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: disabled, value: customer.billingAddress.postCode })
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
					React.createElement("input", { type: "text", disabled: disabled, value: customer.telephone })
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
					React.createElement("input", { type: "text", disabled: disabled, value: customer.email })
				)
			)
		);
	}
});

exports = module.exports = Customer;