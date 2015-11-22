var React = require("react");
var Select = require("react-select");

var SupplierActions = require("../actions/SupplierActions");
var SuppliersStore = require("../stores/SuppliersStore");

var SuppliersSelect = React.createClass({
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
			suppliers: SuppliersStore.getSuppliers()
		});
	},
	componentDidMount: function() {
		SuppliersStore.addChangeListener(this._onChange);
		SupplierActions.getSuppliers({});
	},
	getInitialState: function() {
		return {
			suppliers: SuppliersStore.getSuppliers()
		};
	},
	handleOnInputChange: function(inputValue) {
		SupplierActions.getSuppliers({ searchQuery: inputValue });
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.props.onChange}
					options={this.state.suppliers}
					valueKey={"_id"}
					value={this.props.value} />
		);
	}
});

exports = module.exports = SuppliersSelect;