"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		return {};
	},
	render: function render() {
		var supplierName = "";
		if (typeof this.state.locals.product.supplier != "undefined" && typeof this.state.locals.product.supplier.name != "undefined") {
			supplierName = this.state.locals.product.supplier.name;
		}
		var pageTitle = "View product";
		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement(
					"a",
					{ className: "right fancy radius button tiny", href: "/sycamore-erp/product/" + this.state.locals.product._id },
					"Edit"
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"ul",
					{ "data-tab": "data-tab", role: "tablist", className: "tabs" },
					React.createElement(
						"li",
						{ role: "presentation", className: "tab-title active" },
						React.createElement(
							"a",
							{ href: "#general", role: "tab", tabIndex: "0", "aria-selected": "true", "aria-controls": "general" },
							"General"
						)
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
						"div",
						{ className: "tabs-content" },
						React.createElement(
							"section",
							{ role: "tabpanel", "aria-hidden": "false", id: "general", className: "content active" },
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
									this.state.locals.product.name
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
										"Supplier"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									supplierName
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
										"Product Code"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									this.state.locals.product.productCode
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
										"Price"
									)
								),
								React.createElement(
									"div",
									{ className: "large-8 columns" },
									this.state.locals.product.price
								)
							)
						)
					)
				)
			)
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;