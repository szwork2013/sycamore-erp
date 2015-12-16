"use strict";

var React = require("react");
var CreateEditCustomer = require("./CreateEditCustomer");
var CreateEditProperty = require("./CreateEditProperty");
var ProductsTable = require("./ProductsTable");

var OrderActions = require("../actions/OrderActions");
var OrderStore = require("../stores/OrderStore");

var Order = React.createClass({
	displayName: "Order",

	"propTypes": {
		"order": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function _onChange() {
		this.setState({
			order: {
				_id: OrderStore.getId(),
				customer: OrderStore.getCustomer(),
				property: OrderStore.getProperty(),
				products: OrderStore.getProducts(),
				subTotal: OrderStore.getSubTotal(),
				VAT: OrderStore.getVAT(),
				total: OrderStore.getTotal()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		OrderStore.addChangeListener(this._onChange);
		OrderStore.loadData(this.props.order);
	},
	getInitialState: function getInitialState() {
		return {
			order: {
				_id: OrderStore.getId(),
				customer: OrderStore.getCustomer(),
				property: OrderStore.getProperty(),
				products: OrderStore.getProducts(),
				subTotal: OrderStore.getSubTotal(),
				VAT: OrderStore.getVAT(),
				total: OrderStore.getTotal()
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
					{ className: "large-6 columns" },
					React.createElement(CreateEditCustomer, null)
				),
				React.createElement(
					"div",
					{ className: "large-6 columns" },
					React.createElement(CreateEditProperty, { displayCustomerDropdown: false })
				)
			),
			React.createElement(ProductsTable, { order: this.state.order, products: this.state.order.products })
		);
	}
});

exports = module.exports = Order;