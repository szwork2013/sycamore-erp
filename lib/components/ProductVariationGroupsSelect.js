"use strict";

var React = require("react");
var Select = require("react-select");

var ProductVariationGroupActions = require("../actions/ProductVariationGroupActions");
var ProductVariationGroupsStore = require("../stores/ProductVariationGroupsStore");

var ProductVariationGroupsSelect = React.createClass({
	displayName: "ProductVariationGroupsSelect",

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
			productVariationGroups: ProductVariationGroupsStore.getProductVariationGroups()
		});
	},
	componentDidMount: function componentDidMount() {
		ProductVariationGroupsStore.addChangeListener(this._onChange);
		ProductVariationGroupActions.getProductVariationGroups({});
	},
	getInitialState: function getInitialState() {
		return {
			productVariationGroups: ProductVariationGroupsStore.getProductVariationGroups()
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ProductVariationGroupActions.getProductVariationGroups({ searchQuery: inputValue });
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onChange: this.props.onChange,
			options: this.state.productVariationGroups,
			valueKey: "_id",
			value: this.props.value });
	}
});

exports = module.exports = ProductVariationGroupsSelect;