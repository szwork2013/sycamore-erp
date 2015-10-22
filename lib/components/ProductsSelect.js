"use strict";

var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var ProductsStore = require("../stores/ProductsStore");

function getProductsFromStore() {
	return {
		products: ProductsStore.getProducts(),
		product: null
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
	handleOnChange: function handleOnChange(value, selectedOptions) {
		if (value) {
			this.setState({ product: value });
		}
		if (selectedOptions.length == 1) {
			this.props.onChange(selectedOptions[0]);
		}
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "Name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onChange: this.handleOnChange,
			options: this.state.products,
			valueKey: "_id",
			value: this.state.product });
	}
});

exports = module.exports = ProductsSelect;