"use strict";

var React = require("react");

var ProductVariationActions = require("../actions/ProductVariationActions");
var ProductVariationStore = require("../stores/ProductVariationStore");

var ProductVariation = React.createClass({
	displayName: "ProductVariation",

	"propTypes": {
		"productVariation": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function _onChange() {
		this.setState({
			productVariation: {
				_id: ProductVariationStore.getId(),
				name: ProductVariationStore.getName()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		ProductVariationStore.addChangeListener(this._onChange);
		ProductVariationStore.loadData(this.props.productVariation);
	},
	getInitialState: function getInitialState() {
		return {
			productVariation: {
				_id: ProductVariationStore.getId(),
				name: ProductVariationStore.getName()
			}
		};
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-4 columns" },
					React.createElement(
						"label",
						{ className: "right inline" },
						"Name"
					)
				),
				React.createElement(
					"div",
					{ className: "large-8 columns" },
					React.createElement("input", { disabled: !this.props.editable,
						onChange: ProductVariationActions.updateProductVariationName,
						type: "text",
						value: this.state.productVariation.name })
				)
			)
		);
	}
});

exports = module.exports = ProductVariation;