"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");
var ActionButton = require("../../components/ActionsBar/ActionButton");
var CustomersSelect = require("../../components/CustomersSelect");
var PropertiesSelect = require("../../components/PropertiesSelect");
var ProductsSelect = require("../../components/ProductsSelect");
var ApplicationActions = require("../../actions/ApplicationActions");
var OrderStore = require("../../stores/OrderStore");

var async = require("async");

function getOrderFromStore() {
	return {
		order: OrderStore.getOrder(),
		product: null
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
	handleAddProduct: function handleAddProduct() {
		if (this.state.product) {
			ApplicationActions.addProductToOrder(this.state.product);
		}
	},
	handleCreateOrder: function handleCreateOrder() {
		var order = {};
		order.products = [];
		async.eachSeries(this.state.order.products, function (product, callback) {
			if (typeof product._id != "undefined") {
				var item = {};
				item.product = product._id;
				item.quantity = product.quantity;
				item.subTotal = product.subTotal;
				item.VAT = product.VAT;
				item.total = product.total;
				order.products.push(item);
			}
			callback();
		}, function () {
			if (typeof this.state.order.customer != "undefined" && typeof this.state.order.customer._id != "undefined") {
				order.customer = this.state.order.customer._id;
			}
			if (typeof this.state.order.property != "undefined" && typeof this.state.order.property._id != "undefined") {
				order.property = this.state.order.property._id;
			}
			order.subTotal = this.state.order.subTotal;
			order.VAT = this.state.order.VAT;
			order.total = this.state.order.total;
			ApplicationActions.createOrder(order);
		});
	},
	handleCustomerChange: function handleCustomerChange(value) {
		ApplicationActions.setCustomerOnOrder(value);
	},
	handlePropertyChange: function handlePropertyChange(value) {
		ApplicationActions.setPropertyOnOrder(value);
	},
	handleProductChange: function handleProductChange(value) {
		this.setState({ product: value });
	},
	handleProductQuantityChange: function handleProductQuantityChange(productIndex, event) {
		var value = event.target.value;
		ApplicationActions.setProductQuantityOnOrder(productIndex, value);
	},
	render: function render() {
		var order = this.state.order;

		var pageTitle = "New order";
		var propertyOpts = {};

		if (typeof order.customer == "undefined" || order.customer == "" || typeof order.customer._id == "undefined") {
			propertyOpts["disabled"] = "disabled";
		}

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement(ActionButton, { onClick: this.handleCreateOrder, label: "Create" })
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
								React.createElement("input", { type: "text", disabled: "disabled", value: order.customer.Name })
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
						propertyOpts,
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
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "large-1 columns" },
							React.createElement(
								"label",
								{ className: "inline" },
								"Add Product"
							)
						),
						React.createElement(
							"div",
							{ className: "large-6 columns" },
							React.createElement(ProductsSelect, { onChange: this.handleProductChange })
						),
						React.createElement(
							"div",
							{ className: "large-2 columns end" },
							React.createElement(
								"a",
								{ className: "button tiny radius fancy", onClick: this.handleAddProduct },
								"Add Product"
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
									{ className: "table-cell large-6" },
									"Product"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Item Price"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Quantity"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Sub Total"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"VAT"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Total"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "table-body" },
							order.products.map(function (product, productIndex) {
								return React.createElement(
									"div",
									{ className: "table-row", key: productIndex },
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.name
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.price
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										React.createElement("input", { type: "number", onChange: this.handleProductQuantityChange.bind(this, productIndex), value: product.quantity })
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.subTotal
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.VAT
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.total
									)
								);
							}, this)
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
									" "
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									" "
								),
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
									order.subTotal
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
									" "
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									" "
								),
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
									order.VAT
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
									" "
								),
								React.createElement(
									"div",
									{ className: "table-cell" },
									" "
								),
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
									order.total
								)
							),
							React.createElement(
								"div",
								{ className: "table-row" },
								React.createElement(
									"div",
									{ className: "table-cell" },
									React.createElement(
										"a",
										{ className: "fancy button tiny radius" },
										"Add Discount"
									),
									React.createElement(
										"a",
										{ className: "fancy button tiny radius" },
										"Add Delivery Charge"
									)
								),
								React.createElement("div", { className: "table-cell" }),
								React.createElement("div", { className: "table-cell" }),
								React.createElement("div", { className: "table-cell" }),
								React.createElement("div", { className: "table-cell" }),
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
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;