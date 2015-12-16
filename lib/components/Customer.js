"use strict";

var React = require("react");

var CustomerActions = require("../actions/CustomerActions");
var CustomerStore = require("../stores/CustomerStore");

var Customer = React.createClass({
	displayName: "Customer",

	"propTypes": {
		"customer": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function _onChange() {
		this.setState({
			customer: {
				_id: CustomerStore.getId(),
				name: CustomerStore.getName(),
				billingAddress: {
					line1: CustomerStore.getBillingAddressLine1(),
					line2: CustomerStore.getBillingAddressLine2(),
					line3: CustomerStore.getBillingAddressLine3(),
					line4: CustomerStore.getBillingAddressLine4(),
					postCode: CustomerStore.getBillingAddressPostCode()
				},
				telephone: CustomerStore.getTelephone(),
				email: CustomerStore.getEmail()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		CustomerStore.addChangeListener(this._onChange);
		CustomerStore.loadData(this.props.customer);
	},
	getInitialState: function getInitialState() {
		return {
			customer: {
				_id: CustomerStore.getId(),
				name: CustomerStore.getName(),
				billingAddress: {
					line1: CustomerStore.getBillingAddressLine1(),
					line2: CustomerStore.getBillingAddressLine2(),
					line3: CustomerStore.getBillingAddressLine3(),
					line4: CustomerStore.getBillingAddressLine4(),
					postCode: CustomerStore.getBillingAddressPostCode()
				},
				telephone: CustomerStore.getTelephone(),
				email: CustomerStore.getEmail()
			}
		};
	},
	render: function render() {
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
						"Company Name / Name"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement("input", { disabled: !this.props.editable,
						onChange: CustomerActions.updateCustomerName,
						type: "text",
						value: this.state.customer.name })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: CustomerActions.updateCustomerBillingAddressLine1,
							type: "text",
							value: this.state.customer.billingAddress.line1 })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: CustomerActions.updateCustomerBillingAddressLine2,
							type: "text",
							value: this.state.customer.billingAddress.line2 })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: CustomerActions.updateCustomerBillingAddressLine3,
							type: "text",
							value: this.state.customer.billingAddress.line3 })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: CustomerActions.updateCustomerBillingAddressLine4,
							type: "text",
							value: this.state.customer.billingAddress.line4 })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: CustomerActions.updateCustomerBillingAddressPostCode,
							type: "text",
							value: this.state.customer.billingAddress.postCode })
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
					React.createElement("input", { disabled: !this.props.editable,
						onChange: CustomerActions.updateCustomerTelephone,
						type: "text",
						value: this.state.customer.telephone })
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
					React.createElement("input", { disabled: !this.props.editable,
						onChange: CustomerActions.updateCustomerEmail,
						type: "text",
						value: this.state.customer.email })
				)
			)
		);
	}
});

exports = module.exports = Customer;