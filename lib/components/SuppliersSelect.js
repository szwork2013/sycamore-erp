"use strict";

var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var SuppliersStore = require("../stores/SuppliersStore");

function getSuppliersFromStore() {
	return {
		suppliers: SuppliersStore.getSuppliers()
	};
}

var SuppliersSelect = React.createClass({
	displayName: "SuppliersSelect",

	_onChange: function _onChange() {
		var state = getSuppliersFromStore();
		console.log(state);
		this.setState(getSuppliersFromStore());
	},
	componentDidMount: function componentDidMount() {
		SuppliersStore.addChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return getSuppliersFromStore();
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ApplicationActions.getSuppliers({ searchQuery: inputValue });
	},
	handleOnOptionLabelClick: function handleOnOptionLabelClick(value, event) {
		this.props.onChange(value);
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onOptionLabelClick: this.handleOnOptionLabelClick,
			options: this.state.suppliers,
			valueKey: "_id" });
	}
});

exports = module.exports = SuppliersSelect;