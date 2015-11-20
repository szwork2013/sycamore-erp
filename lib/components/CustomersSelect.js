"use strict";

var React = require("react");
var Select = require("react-select");

var CustomerActions = require("../actions/CustomerActions");
var CustomersStore = require("../stores/CustomersStore");

var CustomersSelect = React.createClass({
	displayName: "CustomersSelect",

	_onChange: function _onChange() {
		this.setState({
			customers: CustomersStore.getCustomers()
		});
	},
	componentDidMount: function componentDidMount() {
		CustomersStore.addChangeListener(this._onChange);
		CustomerActions.getCustomers({});
	},
	getInitialState: function getInitialState() {
		return {
			customers: CustomersStore.getCustomers(),
			customer: null
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		CustomerActions.getCustomers({ searchQuery: inputValue });
	},
	handleOnChange: function handleOnChange(value, selectedOptions) {
		if (value) {
			this.setState({ customer: value });
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
			options: this.state.customers,
			valueKey: "_id",
			value: this.state.customer });
	}
});

exports = module.exports = CustomersSelect;