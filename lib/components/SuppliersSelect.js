"use strict";

var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var SuppliersStore = require("../stores/SuppliersStore");

var SuppliersSelect = React.createClass({
	displayName: "SuppliersSelect",

	_onChange: function _onChange() {
		this.setState(SuppliersStore.getSuppliers());
	},
	componentDidMount: function componentDidMount() {
		SuppliersStore.addChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		var state = SuppliersStore.getInitialState();
		state.name = this.props.name;
		return state;
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ApplicationActions.getSuppliers({ searchQuery: inputValue });
	},
	render: function render() {
		return React.createElement(Select, { isLoading: this.state.isLoading,
			labelKey: "name",
			name: this.state.name,
			onInputChange: this.handleOnInputChange,
			options: this.state.suppliers,
			value: this.state.product.supplier,
			valueKey: "_id" });
	}
});

exports = module.exports = SuppliersSelect;