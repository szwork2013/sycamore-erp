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
		var properties = this.props.locals.properties;
		var pageTitle = "Properties";

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				React.createElement(
					"a",
					{ href: "/sycamore-erp/property", className: "right fancy radius button tiny" },
					React.createElement("i", { className: "in-button-icon fa fa-fw fa-plus" }),
					" Create"
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "large-12 columns" },
					React.createElement(
						"div",
						{ className: "table" },
						React.createElement(
							"div",
							{ className: "table-head" },
							React.createElement(
								"div",
								{ className: "table-row" },
								React.createElement(
									"div",
									{ className: "table-cell" },
									"Name"
								),
								React.createElement(
									"div",
									{ className: "table-cell large-1" },
									"Actions"
								)
							)
						),
						React.createElement(
							"div",
							{ className: "table-body" },
							properties.map(function (property) {
								return React.createElement(
									"div",
									{ className: "table-row" },
									React.createElement(
										"div",
										{ className: "table-cell" },
										property.name
									),
									React.createElement(
										"div",
										{ className: "table-cell" },
										React.createElement(
											"a",
											{ href: "/sycamore-erp/property/" + property._id },
											React.createElement("i", { className: "icon-button fa fa-fw fa-pencil" })
										),
										React.createElement(
											"a",
											{ href: "/sycamore-erp/property/" + property._id + "/edit.html" },
											React.createElement("i", { className: "icon-button fa fa-fw fa-pencil" })
										),
										React.createElement(
											"a",
											{ href: "/sycamore-erp/property/" + property._id + "/delete" },
											React.createElement("i", { className: "icon-button fa fa-fw fa-trash-o" })
										)
									)
								);
							})
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