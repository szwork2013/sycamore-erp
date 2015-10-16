"use strict";

var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var CustomersStore = require("../stores/CustomersStore");

function getCustomersFromStore() {
	return {
		customers: CustomersStore.getCustomers()
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
	handleOnOptionLabelClick: function handleOnOptionLabelClick(value, event) {
		this.props.onChange(value);
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "Name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onOptionLabelClick: this.handleOnOptionLabelClick,
			options: this.state.customers,
			valueKey: "_id" });
	}
});

exports = module.exports = CustomersSelect;