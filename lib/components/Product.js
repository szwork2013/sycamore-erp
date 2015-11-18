"use strict";

var React = require("react");

var SuppliersSelect = require("./SuppliersSelect");

var ProductActions = require("../actions/ProductActions");
var ProductStore = require("../stores/ProductStore");

var Product = React.createClass({
	displayName: "Product",

	"propTypes": {
		"product": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function _onChange() {
		this.setState({
			product: {
				_id: ProductStore.getId(),
				name: ProductStore.getName(),
				code: ProductStore.getCode(),
				supplier: ProductStore.getSupplier(),
				price: ProductStore.getPrice()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		ProductStore.addChangeListener(this._onChange);
		ProductStore.loadData(this.props.product);
	},
	getInitialState: function getInitialState() {
		return {
			product: {
				_id: ProductStore.getId(),
				name: ProductStore.getName(),
				code: ProductStore.getCode(),
				supplier: ProductStore.getSupplier(),
				price: ProductStore.getPrice()
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
					React.createElement("input", { onChange: ProductActions.updateProductName,
						type: "text",
						value: this.state.product.name })
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
						"Supplier"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement(SuppliersSelect, { onChange: ProductActions.selectProductSupplier,
						type: "text",
						value: this.state.product.supplier })
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
						"Product Code"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement("input", { onChange: ProductActions.updateProductCode,
						type: "text",
						value: this.state.product.code })
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
						"Price"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement("input", { onChange: ProductActions.updateProductPrice,
						type: "number",
						value: this.state.product.price })
				)
			)
		);
	}
});

exports = module.exports = Product;