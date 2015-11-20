"use strict";

var React = require("react");
var Select = require("react-select");

var ProductActions = require("../actions/ProductActions");
var ProductsStore = require("../stores/ProductsStore");

var ProductsSelect = React.createClass({
	displayName: "ProductsSelect",

	_onChange: function _onChange() {
		this.setState({
			products: ProductsStore.getProducts()
		});
	},
	componentDidMount: function componentDidMount() {
		ProductsStore.addChangeListener(this._onChange);
		ProductActions.getProducts({});
	},
	getInitialState: function getInitialState() {
		return {
			products: ProductsStore.getProducts(),
			product: null
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ProductActions.getProducts({ searchQuery: inputValue });
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
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onChange: this.handleOnChange,
			options: this.state.products,
			valueKey: "_id",
			value: this.state.product });
	}
});

exports = module.exports = ProductsSelect;