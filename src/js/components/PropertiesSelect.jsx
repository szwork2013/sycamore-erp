var React = require("react");
var Select = require("react-select");

var PropertyActions = require("../actions/PropertyActions");
var PropertiesStore = require("../stores/PropertiesStore");

var PropertiesSelect = React.createClass({
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
			properties: PropertiesStore.getProperties()
		});
	},
	componentDidMount: function() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertyActions.getProperties({});
	},
	getInitialState: function() {
		return {
			properties: PropertiesStore.getProperties()
		};
	},
	handleOnInputChange: function(inputValue) {
		PropertyActions.getProperties({ searchQuery: inputValue });
	},
	render: function () {
		return (
			<Select labelKey={"address.line1"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onChange={this.props.onChange}
					options={this.state.properties}
					valueKey={"_id"}
					value={this.props.value} />
		);
	}
});

exports = module.exports = PropertiesSelect;