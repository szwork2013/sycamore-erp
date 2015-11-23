"use strict";

var React = require("react");
var Select = require("react-select");

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
				price: ProductStore.getPrice(),
				productCode: ProductStore.getProductCode(),
				productType: ProductStore.getProductType(),
				productVariationGroup: null,
				supplier: ProductStore.getSupplier()
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
				price: ProductStore.getPrice(),
				productCode: ProductStore.getProductCode(),
				productType: ProductStore.getProductType(),
				productVariationGroup: null,
				supplier: ProductStore.getSupplier()
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
						"Type"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement(Select, { onChange: ProductActions.updateProductType,
						value: this.state.product.productType,
						values: ["Simple", "Configurable", "Package"] })
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
						"Variation Group"
					)
				),
				React.createElement("div", { className: "large-8 columns" })
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
						value: this.state.product.supplier._id })
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
						value: this.state.product.productCode })
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