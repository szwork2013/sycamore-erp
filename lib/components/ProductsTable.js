"use strict";

var React = require("react");

var ProductsSelect = require("./ProductsSelect");
var OrderActions = require("../actions/OrderActions");

var ProductsTable = React.createClass({
	displayName: "ProductsTable",

	getInitialState: function getInitialState() {
		return {
			product: {
				_id: null
			}
		};
	},
	handleAddProduct: function handleAddProduct() {
		OrderActions.addProductToOrder(this.state.product);
	},
	handleProductChange: function handleProductChange(value, selectedOptions) {
		var product = selectedOptions[0];
		this.setState({ product: product });
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
							React.createElement(ProductsSelect, { onChange: this.handleProductChange, value: this.state.product._id })
						),
						React.createElement(
							"div",
							{ className: "large-1 columns" },
							React.createElement(
								"a",
								{ className: "button tiny radius fancy", onClick: this.handleAddProduct },
								"Add Product"
							)
						),
						React.createElement(
							"div",
							{ className: "large-4 columns end" },
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
							this.props.order.products.map(function (product, productIndex) {
								return React.createElement(
									"div",
									{ className: "table-row", key: productIndex },
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.product.name
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										product.product.price
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
									{ className: "table-cell left-box" },
									"Sub Total"
								),
								React.createElement(
									"div",
									{ className: "table-cell text-right right-box" },
									this.props.order.subTotal
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
									{ className: "table-cell left-box" },
									"VAT"
								),
								React.createElement(
									"div",
									{ className: "table-cell text-right right-box" },
									this.props.order.VAT
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
									{ className: "table-cell left-box" },
									React.createElement(
										"strong",
										null,
										"Total"
									)
								),
								React.createElement(
									"div",
									{ className: "table-cell text-right right-box" },
									this.props.order.total
								)
							)
						)
					)
				)
			)
		);
	}
});

exports = module.exports = ProductsTable;