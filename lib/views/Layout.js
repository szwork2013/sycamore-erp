"use strict";

var React = require("react");
var Header = require("../components/Header");
var Breadcrumbs = require("../components/Breadcrumbs");

var Layout = React.createClass({
	displayName: "Layout",

	"propTypes": {
		"locals": React.PropTypes.object.isRequired
	},
	render: function render() {
		var locals = this.props.locals;

		var applicationName = locals.applicationName;
		var applicationUrl = locals.applicationUrl;
		var pageTitle = this.props.pageTitle;
		var title = applicationName + " - " + pageTitle;

		var js = "var locals = " + JSON.stringify(locals);

		/* TESTING */
		var breadcrumbs = [{ label: "TEST" }, { label: "TEST 2" }];
		locals.notifications = [];
		/* TESTING */

		var jsTemplate = "";
		if (applicationUrl == "/") {
			jsTemplate = "/js/views/" + locals.template + ".js";
		} else {
			jsTemplate = "/node_modules" + applicationUrl + "public/js/views/" + locals.template + ".js";
		}

		return React.createElement(
			"html",
			null,
			React.createElement(
				"head",
				null,
				React.createElement("meta", { charSet: "utf-8" }),
				React.createElement("link", { rel: "stylesheet", type: "text/css", href: "/css/styles.css" }),
				React.createElement(
					"title",
					null,
					title
				)
			),
			React.createElement(
				"body",
				null,
				React.createElement(Header, { authenticated: locals.authenticated,
					applicationName: applicationName,
					applicationUrl: applicationUrl,
					menus: locals.menus,
					notifications: locals.notifications,
					user: locals.currentUser }),
				React.createElement(Breadcrumbs, { breadcrumbs: breadcrumbs }),
				this.props.children,
				React.createElement("script", { type: "text/javascript", dangerouslySetInnerHTML: { __html: js } }),
				React.createElement("script", { type: "text/javascript", src: jsTemplate })
			)
		);
	}
});

exports = module.exports = Layout;