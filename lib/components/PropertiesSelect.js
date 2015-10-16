"use strict";

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
	displayName: "PropertiesSelect",

	_onChange: function _onChange() {
		this.setState(getPropertiesFromStore());
	},
	componentDidMount: function componentDidMount() {
		PropertiesStore.addChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return getPropertiesFromStore();
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		ApplicationActions.getProperties({ searchQuery: inputValue });
	},
	handleOnOptionLabelClick: function handleOnOptionLabelClick(value, event) {
		this.props.onChange(value);
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onOptionLabelClick: this.handleOnOptionLabelClick,
			options: this.state.properties,
			valueKey: "_id" });
	}
});

exports = module.exports = PropertiesSelect;