var React = require("react");
var Select = require("react-select");

var CustomerActions = require("../actions/CustomerActions");
var CustomersStore = require("../stores/CustomersStore");

var CustomersSelect = React.createClass({
	"propTypes": {
		"onChange": React.PropTypes.func.isRequired,
		"value": React.PropTypes.any
	},
	getDefaultProps: function() {
		var onChange = function(value, selectedOptions) {};
		return {
			"onChange": onChange,
			"value": null
		};
	},
	_onChange: function() {
		this.setState({
			customers: CustomersStore.getCustomers()
		});
	},
	componentDidMount: function() {
		CustomersStore.addChangeListener(this._onChange);
		CustomerActions.getCustomers({});
	},
	componentWillUnount: function() {
		CustomersStore.removeChangeListener(this._onChange);
	},
	getInitialState: function() {
		return {
			customers: CustomersStore.getCustomers()
		};
	},
	handleOnInputChange: function(inputValue) {
		CustomerActions.getCustomers({ searchQuery: inputValue });
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.props.onChange}
					options={this.state.customers}
					valueKey={"_id"}
					value={this.props.value} />
		);
	}
});

exports = module.exports = CustomersSelect;