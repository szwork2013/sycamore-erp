"use strict";

var React = require("react");
var Select = require("react-select");

var SupplierActions = require("../actions/SupplierActions");
var SuppliersStore = require("../stores/SuppliersStore");

var SuppliersSelect = React.createClass({
	displayName: "SuppliersSelect",

	_onChange: function _onChange() {
		this.setState({
			suppliers: SuppliersStore.getSuppliers()
		});
	},
	componentDidMount: function componentDidMount() {
		SuppliersStore.addChangeListener(this._onChange);
		SupplierActions.getSuppliers({});
		this.setState({ value: this.props.value });
	},
	getInitialState: function getInitialState() {
		return {
			suppliers: SuppliersStore.getSuppliers(),
			supplier: null
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		SupplierActions.getSuppliers({ searchQuery: inputValue });
	},
	handleOnChange: function handleOnChange(value, selectedOptions) {
		if (value) {
			this.setState({ supplier: value });
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