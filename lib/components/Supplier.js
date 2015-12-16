"use strict";

var React = require("react");

var SupplierActions = require("../actions/SupplierActions");
var SupplierStore = require("../stores/SupplierStore");

var Supplier = React.createClass({
	displayName: "Supplier",

	"propTypes": {
		"supplier": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function _onChange() {
		this.setState({
			supplier: {
				_id: SupplierStore.getId(),
				name: SupplierStore.getName(),
				billingAddress: {
					line1: SupplierStore.getBillingAddressLine1(),
					line2: SupplierStore.getBillingAddressLine2(),
					line3: SupplierStore.getBillingAddressLine3(),
					line4: SupplierStore.getBillingAddressLine4(),
					postCode: SupplierStore.getBillingAddressPostCode()
				},
				telephone: SupplierStore.getTelephone(),
				email: SupplierStore.getEmail()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		SupplierStore.addChangeListener(this._onChange);
		SupplierStore.loadData(this.props.supplier);
	},
	componentWillUnmount: function componentWillUnmount() {
		SupplierStore.removeChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return {
			supplier: {
				_id: SupplierStore.getId(),
				name: SupplierStore.getName(),
				billingAddress: {
					line1: SupplierStore.getBillingAddressLine1(),
					line2: SupplierStore.getBillingAddressLine2(),
					line3: SupplierStore.getBillingAddressLine3(),
					line4: SupplierStore.getBillingAddressLine4(),
					postCode: SupplierStore.getBillingAddressPostCode()
				},
				telephone: SupplierStore.getTelephone(),
				email: SupplierStore.getEmail()
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
						"Name"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement("input", { disabled: !this.props.editable,
						onChange: SupplierActions.updateSupplierName,
						type: "text",
						value: this.state.supplier.name })
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
							onChange: SupplierActions.updateSupplierBillingAddressLine1,
							type: "text",
							value: this.state.supplier.billingAddress.line1 })
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
							onChange: SupplierActions.updateSupplierBillingAddressLine2,
							type: "text",
							value: this.state.supplier.billingAddress.line2 })
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
							onChange: SupplierActions.updateSupplierBillingAddressLine3,
							type: "text",
							value: this.state.supplier.billingAddress.line3 })
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
							onChange: SupplierActions.updateSupplierBillingAddressLine4,
							type: "text",
							value: this.state.supplier.billingAddress.line4 })
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
							onChange: SupplierActions.updateSupplierBillingAddressPostCode,
							type: "text",
							value: this.state.supplier.billingAddress.postCode })
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
						onChange: SupplierActions.updateSupplierTelephone,
						type: "text",
						value: this.state.supplier.telephone })
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
						onChange: SupplierActions.updateSupplierEmail,
						type: "text",
						value: this.state.supplier.email })
				)
			)
		);
	}
});

exports = module.exports = Supplier;