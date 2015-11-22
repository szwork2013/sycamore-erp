"use strict";

var React = require("react");
var Select = require("react-select");

var ProductActions = require("../actions/ProductActions");
var ProductsStore = require("../stores/ProductsStore");

var ProductsSelect = React.createClass({
	displayName: "ProductsSelect",

	"propTypes": {
		"onChange": React.PropTypes.func.isRequired,
		"value": React.PropTypes.any
	},
	getDefaultProps: function getDefaultProps() {
		var onChange = function onChange(value, selectedOptions) {};
		return {
			"onChange": onChange,
			"value": null
		};
	},
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
			products: ProductsStore.getProducts()
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ProductActions.getProducts({ searchQuery: inputValue });
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onChange: this.props.onChange,
			options: this.state.products,
			valueKey: "_id",
			value: this.props.value });
	}
});

exports = module.exports = ProductsSelect;