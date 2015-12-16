"use strict";

var React = require("react");

var PropertyActions = require("../actions/PropertyActions");
var PropertyStore = require("../stores/PropertyStore");

var CustomersSelect = require("./CustomersSelect");
var CustomerStore = require("../stores/CustomerStore");

var Property = React.createClass({
	displayName: "Property",

	"propTypes": {
		"property": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onCustomerChange: function _onCustomerChange() {
		this.setState({
			customer: CustomerStore.getCustomer()
		});
	},
	_onPropertyChange: function _onPropertyChange() {
		this.setState({
			property: {
				_id: PropertyStore.getId(),
				customer: CustomerStore.getCustomer(),
				accessArrangements: PropertyStore.getAccessArrangements(),
				address: {
					line1: PropertyStore.getAddressLine1(),
					line2: PropertyStore.getAddressLine2(),
					line3: PropertyStore.getAddressLine3(),
					line4: PropertyStore.getAddressLine4(),
					postCode: PropertyStore.getAddressPostCode()
				},
				telephone: PropertyStore.getTelephone()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		CustomerStore.addChangeListener(this._onCustomerChange);
		PropertyStore.addChangeListener(this._onPropertyChange);
		PropertyStore.loadData(this.props.property);
	},
	getInitialState: function getInitialState() {
		return {
			property: {
				_id: PropertyStore.getId(),
				customer: CustomerStore.getCustomer(),
				accessArrangements: PropertyStore.getAccessArrangements(),
				address: {
					line1: PropertyStore.getAddressLine1(),
					line2: PropertyStore.getAddressLine2(),
					line3: PropertyStore.getAddressLine3(),
					line4: PropertyStore.getAddressLine4(),
					postCode: PropertyStore.getAddressPostCode()
				},
				telephone: PropertyStore.getTelephone()
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
						"Customer"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement(CustomersSelect, { onChange: PropertyActions.setCustomerOnProperty, value: this.state.property.customer._id })
				)
			),
			React.createElement(
				"fieldset",
				null,
				React.createElement(
					"label",
					null,
					"Delivery Address"
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: PropertyActions.updatePropertyAddressLine1,
							type: "text",
							value: this.state.property.address.line1 })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: PropertyActions.updatePropertyAddressLine2,
							type: "text",
							value: this.state.property.address.line2 })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: PropertyActions.updatePropertyAddressLine3,
							type: "text",
							value: this.state.property.address.line3 })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: PropertyActions.updatePropertyAddressLine4,
							type: "text",
							value: this.state.property.address.line4 })
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
						React.createElement("input", { disabled: !this.props.editable,
							onChange: PropertyActions.updatePropertyAddressPostCode,
							type: "text",
							value: this.state.property.address.postCode })
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
					React.createElement("textarea", { disabled: !this.props.editable,
						onChange: PropertyActions.updatePropertyAccessArrangements,
						value: this.state.property.accessArrangements })
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
					React.createElement("input", { disabled: !this.props.editable,
						onChange: PropertyActions.updatePropertyTelephone,
						type: "text",
						value: this.state.property.telephone })
				)
			)
		);
	}
});

exports = module.exports = Property;