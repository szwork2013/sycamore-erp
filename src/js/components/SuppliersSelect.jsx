var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var SuppliersStore = require("../stores/SuppliersStore");

var SuppliersSelect = React.createClass({
	_onChange: function() {
		var suppliers = SuppliersStore.getSuppliers();
		this.setState({ suppliers: suppliers });
	},
	componentDidMount: function() {
		SuppliersStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		var state = SuppliersStore.getInitialState();
		state.name = this.props.name;
		return state;
	},
	handleOnInputChange: function(inputValue) {
		ApplicationActions.getSuppliers({ searchQuery: inputValue });
	},
	render: function () {
		return (
			<Select isLoading={this.state.isLoading}
					labelKey={"name"}
					name={this.state.name}
					onInputChange={this.handleOnInputChange}
					options={this.state.suppliers}
					value={this.state.value}
					valueKey={"_id"} />
		);
	}
});

exports = module.exports = SuppliersSelect;