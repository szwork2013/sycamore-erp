"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var ProductVariation = require("../../components/ProductVariation");
var ProductVariationStore = require("../../stores/ProductVariationStore");
var ProductVariationActions = require("../../actions/ProductVariationActions");

var View = React.createClass({
	displayName: "View",

	handleSaveClick: function handleSaveClick() {
		ProductVariationActions.saveProductVariation(ProductVariationStore.getProductVariation());
	},
	render: function render() {
		var buttonAction, pageTitle, productVariation;

		if (typeof this.props.locals.productVariation != "undefined") {
			productVariation = this.props.locals.productVariation;
		}

		if (productVariation != null && typeof productVariation._id != "undefined") {
			pageTitle = "Edit product variation";
			buttonAction = "Save";
		} else {
			pageTitle = "New product variation";
			buttonAction = "Create";
		}

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement(
					"a",
					{ className: "right fancy radius button tiny", href: "#", onClick: this.handleSaveClick },
					buttonAction
				)
			),
			React.createElement(ProductVariation, { productVariation: productVariation, editable: true, isNew: true })
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;