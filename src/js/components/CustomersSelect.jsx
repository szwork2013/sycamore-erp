var React = require("react");
var Select = require("react-select");

var CustomerActions = require("../actions/CustomerActions");
var CustomersStore = require("../stores/CustomersStore");

var CustomersSelect = React.createClass({
	_onChange: function() {
		this.setState({
			customers: CustomersStore.getCustomers()
		});
	},
	componentDidMount: function() {
		CustomersStore.addChangeListener(this._onChange);
		CustomerActions.getCustomers({});
	},
	getInitialState: function() {
		return {
			customers: CustomersStore.getCustomers(),
			customer: null
		};
	},
	handleOnInputChange: function(inputValue) {
		CustomerActions.getCustomers({ searchQuery: inputValue });
	},
	handleOnChange: function(value, selectedOptions) {
		if(value) {
			this.setState({ customer: value });
		}
		if(selectedOptions.length == 1) {
			this.props.onChange(selectedOptions[0]);
		}
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.handleOnChange}
					options={this.state.customers}
					valueKey={"_id"}
					value={this.state.customer} />
		);
	}
});

exports = module.exports = CustomersSelect;