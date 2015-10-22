"use strict";

var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var CustomersStore = require("../stores/CustomersStore");

function getCustomersFromStore() {
	return {
		customers: CustomersStore.getCustomers(),
		customer: null
	};
}

var CustomersSelect = React.createClass({
	displayName: "CustomersSelect",

	_onChange: function _onChange() {
		this.setState(getCustomersFromStore());
	},
	componentDidMount: function componentDidMount() {
		CustomersStore.addChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return getCustomersFromStore();
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ApplicationActions.getCustomers({ searchQuery: inputValue });
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
			options: this.state.customers,
			valueKey: "_id",
			value: this.state.customer });
	}
});

exports = module.exports = CustomersSelect;