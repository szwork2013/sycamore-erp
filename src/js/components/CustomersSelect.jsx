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
	_onChange: function() {
		this.setState(getCustomersFromStore());
	},
	componentDidMount: function() {
		CustomersStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		return getCustomersFromStore();
	},
	handleOnInputChange: function(inputValue) {
		ApplicationActions.getCustomers({ searchQuery: inputValue });
	},
	handleOnOptionLabelClick: function(value, event) {
		this.props.onChange(value);
	},
	render: function () {
		return (
			<Select labelKey={"Name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onOptionLabelClick={this.handleOnOptionLabelClick}
					options={this.state.customers}
					valueKey={"_id"} />
		);
	}
});

exports = module.exports = CustomersSelect;