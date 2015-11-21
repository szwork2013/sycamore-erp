var React = require("react");
var Select = require("react-select");

var SupplierActions = require("../actions/SupplierActions");
var SuppliersStore = require("../stores/SuppliersStore");

var SuppliersSelect = React.createClass({
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
			suppliers: SuppliersStore.getSuppliers(),
			supplier: this.props.value
		};
	},
	handleOnInputChange: function(inputValue) {
		SupplierActions.getSuppliers({ searchQuery: inputValue });
	},
	handleOnChange: function(value, selectedOptions) {
		if(value) {
			this.setState({ supplier: value });
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
					options={this.state.suppliers}
					valueKey={"_id"}
					value={this.state.supplier} />
		);
	}
});

exports = module.exports = SuppliersSelect;