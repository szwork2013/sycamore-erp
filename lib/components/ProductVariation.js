"use strict";

var React = require("react");
var ReactTabs = require("react-tabs");
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Tabs.setUseDefaultStyles(false);

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
				label: ProductVariationStore.getLabel(),
				name: ProductVariationStore.getName(),
				values: ProductVariationStore.getValues()
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
				label: ProductVariationStore.getLabel(),
				name: ProductVariationStore.getName(),
				values: ProductVariationStore.getValues()
			}
		};
	},
	render: function render() {
		return React.createElement(
			Tabs,
			null,
			React.createElement(
				TabList,
				null,
				React.createElement(
					Tab,
					null,
					"General"
				),
				React.createElement(
					Tab,
					null,
					"Values"
				)
			),
			React.createElement(
				TabPanel,
				null,
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-4 columns" },
								React.createElement(
									"label",
									{ className: "right inline" },
									"Label"
								)
							),
							React.createElement(
								"div",
								{ className: "large-8 columns" },
								React.createElement("input", { disabled: !this.props.editable,
									onChange: ProductVariationActions.updateProductVariationLabel,
									type: "text",
									value: this.state.productVariation.label })
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
					)
				)
			),
			React.createElement(
				TabPanel,
				null,
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "large-6 columns" },
						React.createElement(
							"div",
							{ className: "row" },
							React.createElement(
								"div",
								{ className: "large-12 columns" },
								React.createElement(
									"a",
									{ className: "fancy radius button tiny", href: "#", onClick: ProductVariationActions.addValue },
									"Add Value"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "table" },
							React.createElement(
								"div",
								{ className: "table-header" },
								React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										"Label"
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										"Value"
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										" "
									)
								)
							),
							React.createElement(
								"div",
								{ className: "table-body" },
								this.state.productVariation.values.map(function (value, valueIndex) {
									React.createElement(
										"div",
										{ className: "table-row", key: valueIndex },
										React.createElement(
											"div",
											{ className: "table-cell" },
											React.createElement("input", { onChange: ProductVariationActions.updateLabel.bind(this, valueIndex),
												type: "text",
												value: value.label })
										),
										React.createElement(
											"div",
											{ className: "table-cell" },
											React.createElement("input", { onChange: ProductVariationActions.updateValue.bind(this, valueIndex),
												type: "text",
												value: value.value })
										),
										React.createElement(
											"div",
											{ className: "table-cell" },
											React.createElement(
												"a",
												{ className: "fancy radius button tiny",
													href: "#",
													onClick: ProductVariationActions.removeValue.bind(this, valueIndex) },
												"Remove"
											)
										)
									);
								}, this)
							)
						)
					)
				)
			)
		);
	}
});

exports = module.exports = ProductVariation;