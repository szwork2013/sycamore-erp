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
	handleOnChange: function(value, selectedOptions) {
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
					options={this.state.properties}
					valueKey={"_id"} />
		);
	}
});

exports = module.exports = PropertiesSelect;