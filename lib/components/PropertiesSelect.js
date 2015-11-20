"use strict";

var React = require("react");
var Select = require("react-select");

var PropertyActions = require("../actions/PropertyActions");
var PropertiesStore = require("../stores/PropertiesStore");

var PropertiesSelect = React.createClass({
	displayName: "PropertiesSelect",

	_onChange: function _onChange() {
		this.setState({
			properties: PropertiesStore.getProperties()
		});
	},
	componentDidMount: function componentDidMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertyActions.getProperties({});
	},
	getInitialState: function getInitialState() {
		return {
			properties: PropertiesStore.getProperties(),
			property: null
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		PropertyActions.getProperties({ searchQuery: inputValue });
	},
	handleOnChange: function handleOnChange(value, selectedOptions) {
		if (value) {
			this.setState({ property: value });
		}
		if (selectedOptions.length == 1) {
			this.props.onChange(selectedOptions[0]);
		}
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "name",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onChange: this.handleOnChange,
			options: this.state.properties,
			valueKey: "_id",
			value: this.state.property });
	}
});

exports = module.exports = PropertiesSelect;