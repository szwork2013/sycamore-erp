"use strict";

var React = require("react");
var Select = require("react-select");

var SupplierActions = require("../actions/SupplierActions");
var SuppliersStore = require("../stores/SuppliersStore");

var SuppliersSelect = React.createClass({
	displayName: "SuppliersSelect",

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
			suppliers: SuppliersStore.getSuppliers()
		});
	},
	componentDidMount: function componentDidMount() {
		SuppliersStore.addChangeListener(this._onChange);
		SupplierActions.getSuppliers({});
	},
	componentWillUnmount: function componentWillUnmount() {
		SuppliersStore.removeChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return {
			suppliers: SuppliersStore.getSuppliers()
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		SupplierActions.getSuppliers({ searchQuery: inputValue });
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onChange: this.props.onChange,
			options: this.state.suppliers,
			valueKey: "_id",
			value: this.props.value });
	}
});

exports = module.exports = SuppliersSelect;