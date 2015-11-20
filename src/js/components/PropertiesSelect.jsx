var React = require("react");
var Select = require("react-select");

var PropertyActions = require("../actions/PropertyActions");
var PropertiesStore = require("../stores/PropertiesStore");

var PropertiesSelect = React.createClass({
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
			properties: PropertiesStore.getProperties(),
			property: null
		};
	},
	handleOnInputChange: function(inputValue) {
		PropertyActions.getProperties({ searchQuery: inputValue });
	},
	handleOnChange: function(value, selectedOptions) {
		if(value) {
			this.setState({ property: value });
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
					options={this.state.properties}
					valueKey={"_id"}
					value={this.state.property} />
		);
	}
});

exports = module.exports = PropertiesSelect;