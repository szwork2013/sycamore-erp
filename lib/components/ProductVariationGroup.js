"use strict";

var React = require("react");

var ProductVariationGroupActions = require("../actions/ProductVariationGroupActions");
var ProductVariationGroupStore = require("../stores/ProductVariationGroupStore");

var ProductVariationGroup = React.createClass({
	displayName: "ProductVariationGroup",

	"propTypes": {
		"productVariationGroup": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function _onChange() {
		this.setState({
			productVariationGroup: {
				_id: ProductVariationGroupStore.getId(),
				name: ProductVariationGroupStore.getName()
			}
		});
	},
	componentDidMount: function componentDidMount() {
		ProductVariationGroupStore.addChangeListener(this._onChange);
		ProductVariationGroupStore.loadData(this.props.productVariationGroup);
	},
	componentWillUnmount: function componentWillUnmount() {
		ProductVariationGroupStore.removeChangeListener(this._onChange);
	},
	getInitialState: function getInitialState() {
		return {
			productVariationGroup: {
				_id: ProductVariationGroupStore.getId(),
				name: ProductVariationGroupStore.getName()
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
						onChange: ProductVariationGroupActions.updateProductVariationGroupName,
						type: "text",
						value: this.state.productVariationGroup.name })
				)
			)
		);
	}
});

exports = module.exports = ProductVariationGroup;