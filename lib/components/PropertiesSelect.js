"use strict";

var React = require("react");
var Select = require("react-select");

var PropertyActions = require("../actions/PropertyActions");
var PropertiesStore = require("../stores/PropertiesStore");

var PropertiesSelect = React.createClass({
	displayName: "PropertiesSelect",

	"propTypes": {
		"onChange": React.PropTypes.func.isRequired,
		"value": React.PropTypes.any
	},
	getDefaultProps: function getDefaultProps() {
		var onChange = function onChange(value, selectedOptions) {};
		return {
			"onChange": onChange,
			"value": null
		};
	},
	_onChange: function _onChange() {
		this.setState({
			properties: PropertiesStore.getProperties()
		});
	},
	componentDidMount: function componentDidMount() {
		PropertiesStore.addChangeListener(this._onChange);
		PropertyActions.getProperties({});
	},
	componentWillUnount: function componentWillUnount() {
		PropertiesStore.removeChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return {
			properties: PropertiesStore.getProperties()
		};
	},
	handleOnInputChange: function handleOnInputChange(inputValue) {
		PropertyActions.getProperties({ searchQuery: inputValue });
	},
	render: function render() {
		return React.createElement(Select, { labelKey: "address.line1",
			name: this.props.name,
			onInputChange: this.handleOnInputChange,
			onChange: this.props.onChange,
			options: this.state.properties,
			valueKey: "_id",
			value: this.props.value });
	}
});

exports = module.exports = PropertiesSelect;