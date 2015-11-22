"use strict";

var React = require("react");
var Select = require("react-select");

var CustomerActions = require("../actions/CustomerActions");
var CustomersStore = require("../stores/CustomersStore");

var CustomersSelect = React.createClass({
	displayName: "CustomersSelect",

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
			customers: CustomersStore.getCustomers()
		});
	},
	componentDidMount: function componentDidMount() {
		CustomersStore.addChangeListener(this._onChange);
		CustomerActions.getCustomers({});
	},
	getInitialState: function getInitialState() {
		return {
			customers: CustomersStore.getCustomers()
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		CustomerActions.getCustomers({ searchQuery: inputValue });
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onChange: this.props.onChange,
			options: this.state.customers,
			valueKey: "_id",
			value: this.props.value });
	}
});

exports = module.exports = CustomersSelect;