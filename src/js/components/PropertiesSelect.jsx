var React = require("react");
var Select = require("react-select");

var ApplicationActions = require("../actions/ApplicationActions");
var PropertiesStore = require("../stores/PropertiesStore");

function getPropertiesFromStore() {
	return {
		properties: PropertiesStore.getProperties()
	};
}

var PropertiesSelect = React.createClass({
	_onChange: function() {
		this.setState(getPropertiesFromStore());
	},
	componentDidMount: function() {
		PropertiesStore.addChangeListener(this._onChange);
	},
	getInitialState: function() {
		return getPropertiesFromStore();
	},
	handleOnInputChange: function(inputValue) {
		ApplicationActions.getProperties({ searchQuery: inputValue });
	},
	handleOnOptionLabelClick: function(value, event) {
		this.props.onChange(value);
	},
	render: function () {
		return (
			<Select labelKey={"name"}
					name={this.props.name}
					onInputChange={this.handleOnInputChange}
					onOptionLabelClick={this.handleOnOptionLabelClick}
					options={this.state.properties}
					valueKey={"_id"} />
		);
	}
});

exports = module.exports = PropertiesSelect;