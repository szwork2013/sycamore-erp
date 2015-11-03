"use strict";

var React = require("react");

var PropertyStore = require("../stores/PropertyStore");

function getPropertyFromStore(property) {
	return {
		property: PropertyStore.getProperty(property)
	};
}

var Property = React.createClass({
	displayName: "Property",

	_onChange: function _onChange() {
		this.setState(getPropertyFromStore());
	},
	componentDidMount: function componentDidMount() {
		PropertyStore.addListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		var property;

		if (typeof this.props.property != "undefined") {
			property = this.props.property;
		}

		return getPropertyFromStore(property);
	},
	render: function render() {
		var property = this.state.property;

		var disabled = false;
		if (this.props.editable) {
			disabled = true;
		}

		return React.createElement(
			"div",
			null,
			React.createElement(
				"fieldset",
				null,
				React.createElement(
					"label",
					null,
					"Property Address"
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-4 columns" },
						React.createElement("label", { className: "right inline" })
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: "disabled", value: property.address.line1 })
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-4 columns" },
						React.createElement("label", { className: "right inline" })
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: "disabled", value: property.address.line2 })
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-4 columns" },
						React.createElement("label", { className: "right inline" })
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: "disabled", value: property.address.line3 })
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-4 columns" },
						React.createElement("label", { className: "right inline" })
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: "disabled", value: property.address.line4 })
					)
				),
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-4 columns" },
						React.createElement("label", { className: "right inline" })
					),
					React.createElement(
						"div",
						{ className: "large-8 columns" },
						React.createElement("input", { type: "text", disabled: "disabled", value: property.address.postCode })
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-4 columns" },
					React.createElement(
						"label",
						{ className: "right inline" },
						"Access Arrangements"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement("textarea", null)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-4 columns" },
					React.createElement(
						"label",
						{ className: "right inline" },
						"Access Telephone"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement("input", { type: "text", disabled: "disabled", value: property.telephone })
				)
			)
		);
	}
});

exports = module.exports = Property;