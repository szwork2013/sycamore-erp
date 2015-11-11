"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Modal = require("react-modal");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ActionButton = require("sycamore-platform-components").ActionButton;
var CustomersSelect = require("../../components/CustomersSelect");
var PropertiesSelect = require("../../components/PropertiesSelect");
var ProductsSelect = require("../../components/ProductsSelect");
var ApplicationActions = require("../../actions/ApplicationActions");

var OrderStore = require("../../stores/OrderStore");

var Customer = require("../../components/Customer");
var Property = require("../../components/Property");

var async = require("async");

function getOrderFromStore() {
	return {
		order: OrderStore.getOrder(),
		product: null,
		customerModalIsOpen: false,
		propertyModalIsOpen: false
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

	openCustomerModal: function openCustomerModal() {
		this.setState({ customerModalIsOpen: true });
	},

	closeCustomerModal: function closeCustomerModal() {
		this.setState({ customerModalIsOpen: false });
	},

	openPropertyModal: function openPropertyModal() {
		this.setState({ propertyModalIsOpen: true });
	},

	closePropertyModal: function closePropertyModal() {
		this.setState({ propertyModalIsOpen: false });
	},

	handleAddProduct: function handleAddProduct() {
		if (this.state.product) {
			ApplicationActions.addProductToOrder(this.state.product);
		}
	},
	handleCreateOrder: function handleCreateOrder() {
		var _order = this.state.order;

		var order = {};
		order.products = [];
		async.eachSeries(_order.products, function (product, callback) {
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
			if (typeof _order.customer != "undefined" && typeof _order.customer._id != "undefined") {
				order.customer = _order.customer._id;
			}
			if (typeof _order.property != "undefined" && typeof _order.property._id != "undefined") {
				order.property = _order.property._id;
			}
			order.subTotal = _order.subTotal;
			order.VAT = _order.VAT;
			order.total = _order.total;
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
				Modal,
				{ isOpen: this.state.customerModalIsOpen,
					onRequestClose: this.closeCustomerModal },
				React.createElement(Customer, { customer: order.customer, editable: true, isNew: true })
			),
			React.createElement(
				Modal,
				{ isOpen: this.state.propertyModalIsOpen,
					onRequestClose: this.closePropertyModal },
				React.createElement(Property, { property: order.property, editable: true, isNew: true })
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
								React.createElement("input", { className: "right fancy radius button tiny", type: "button", value: "New", onClick: this.openCustomerModal })
							)
						),
						React.createElement(Customer, { customer: order.customer, editable: false })
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
								React.createElement("input", { className: "right fancy radius button tiny", type: "button", value: "New", onClick: this.openPropertyModal })
							)
						),
						React.createElement(Property, { property: order.property, editable: false })
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
							{ className: "table-header" },
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
							{ className: "table-footer" },
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