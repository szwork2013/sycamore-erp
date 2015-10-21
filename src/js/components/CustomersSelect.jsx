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
	handleOnChange: function(value, selectedOptions) {
		if(selectedOptions.length == 1) {
			this.props.onChange(selectedOptions[0]);
		}
	},
	render: function () {
		return (
			<Select labelKey={"Name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.handleOnChange}
					options={this.state.customers}
					valueKey={"_id"} />
		);
	}
});

exports = module.exports = CustomersSelect;