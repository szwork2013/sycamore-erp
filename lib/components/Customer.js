"use strict";

var React = require("react");

var CustomerStore = require("../stores/CustomerStore");

var Customer = React.createClass({
	displayName: "Customer",

	"propTypes": {
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
			{ className: "row" },
			React.createElement(
				"div",
				{ className: "large-6 columns" },
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
						React.createElement("input", { type: "text", disabled: !this.props.editable, value: this.state.customer.name })
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
							React.createElement("input", { type: "text", disabled: !this.props.editable, value: this.state.customer.billingAddress.line1 })
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
							React.createElement("input", { type: "text", disabled: !this.props.editable, value: this.state.customer.billingAddress.line2 })
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
							React.createElement("input", { type: "text", disabled: !this.props.editable, value: this.state.customer.billingAddress.line3 })
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
							React.createElement("input", { type: "text", disabled: !this.props.editable, value: this.state.customer.billingAddress.line4 })
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
							React.createElement("input", { type: "text", disabled: !this.props.editable, value: this.state.customer.billingAddress.postCode })
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
						React.createElement("input", { type: "text", disabled: !this.props.editable, value: this.state.customer.telephone })
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
						React.createElement("input", { type: "text", disabled: !this.props.editable, value: this.state.customer.email })
					)
				)
			)
		);
	}
});

exports = module.exports = Customer;