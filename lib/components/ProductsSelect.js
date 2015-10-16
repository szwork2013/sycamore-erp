"use strict";

var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var ProductsStore = require("../stores/ProductsStore");

function getProductsFromStore() {
	return {
		products: ProductsStore.getProducts()
	};
}

var ProductsSelect = React.createClass({
	displayName: "ProductsSelect",

	_onChange: function _onChange() {
		this.setState(getProductsFromStore());
	},
	componentDidMount: function componentDidMount() {
		ProductsStore.addChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return getProductsFromStore();
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ApplicationActions.getProducts({ searchQuery: inputValue });
	},
	handleOnOptionLabelClick: function handleOnOptionLabelClick(value, event) {
		this.props.onChange(value);
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onOptionLabelClick: this.handleOnOptionLabelClick,
			options: this.state.products,
			valueKey: "_id" });
	}
});

exports = module.exports = ProductsSelect;