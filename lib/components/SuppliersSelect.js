"use strict";

var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var SuppliersStore = require("../stores/SuppliersStore");

function getSuppliersFromStore() {
	return {
		suppliers: SuppliersStore.getSuppliers(),
		supplier: null
	};
}

var SuppliersSelect = React.createClass({
	displayName: "SuppliersSelect",

	_onChange: function _onChange() {
		this.setState(getSuppliersFromStore());
	},
	componentDidMount: function componentDidMount() {
		SuppliersStore.addChangeListener(this._onChange);
		ApplicationActions.getSuppliers({});
	},
	getInitialState: function getInitialState() {
		return getSuppliersFromStore();
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ApplicationActions.getSuppliers({ searchQuery: inputValue });
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
			options: this.state.suppliers,
			valueKey: "_id",
			value: this.state.supplier });
	}
});

exports = module.exports = SuppliersSelect;