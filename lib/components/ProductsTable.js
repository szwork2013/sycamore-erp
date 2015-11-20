"use strict";

var React = require("react");
var ProductsSelect = require("./ProductsSelect");

var ApplicationActions = require("../actions/ApplicationActions");
var ProductsStore = require("../stores/ProductsStore");

var OrderActions = require("../actions/OrderActions");

function getProductsFromStore() {
	return {
		products: ProductsStore.getProducts(),
		product: null
	};
}

var ProductsTable = React.createClass({
	displayName: "ProductsTable",

	_onChange: function _onChange() {
		this.setState(getProductsFromStore());
	},
	componentDidMount: function componentDidMount() {
		ProductsStore.addChangeListener(this._onChange);
		ApplicationActions.getProducts({});
	},
	getInitialState: function getInitialState() {
		return getProductsFromStore();
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ApplicationActions.getProducts({ searchQuery: inputValue });
	},
	handleOnChange: function handleOnChange(value, selectedOptions) {
		if (value) {
			this.setState({ product: value });
		}
		if (selectedOptions.length == 1) {
			this.props.onChange(selectedOptions[0]);
		}
	},
	render: function render() {
		var order = this.props.order;
		var products = this.props.products;

		return React.createElement(
			"div",
			null,
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
							products.map(function (product, productIndex) {
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
										React.createElement("input", { type: "number", onChange: OrderActions.setProductQuantityOnOrder.bind(this, productIndex), value: product.quantity })
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

exports = module.exports = ProductsTable;