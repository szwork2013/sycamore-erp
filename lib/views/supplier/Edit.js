"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;

var View = React.createClass({
	displayName: "View",

	getInitialState: function getInitialState() {
		return {};
	},
	render: function render() {
		var supplier = this.props.locals.supplier;
		var pageTitle = "Edit supplier - " + supplier.name;

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				"form",
				{ action: "/sycamore-erp/supplier/" + supplier._id, encType: "application/x-www-form-urlencoded", method: "POST" },
				React.createElement(
					ActionsBar,
					{ pageTitle: pageTitle },
					React.createElement("input", { type: "submit", className: "right fancy radius button tiny", value: "Save" })
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
										React.createElement("input", { type: "text", name: "supplier[name]" })
									)
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