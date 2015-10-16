var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var SuppliersStore = require("../stores/SuppliersStore");

function getSuppliersFromStore() {
	return {
		suppliers: SuppliersStore.getSuppliers()
	};
}

var SuppliersSelect = React.createClass({
	_onChange: function() {
		var state = getSuppliersFromStore();
		console.log(state);
		this.setState(getSuppliersFromStore());
	},
	componentDidMount: function() {
		SuppliersStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		return getSuppliersFromStore();
	},
	handleOnInputChange: function(inputValue) {
		ApplicationActions.getSuppliers({ searchQuery: inputValue });
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					onInputChange={this.handleOnInputChange}
					options={this.state.suppliers}
					valueKey={"_id"} />
		);
	}
});

exports = module.exports = SuppliersSelect;