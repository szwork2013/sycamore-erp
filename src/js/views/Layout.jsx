var React = require("react");
var Header = require("../components/Header");
var Breadcrumbs = require("../components/Breadcrumbs");

var Layout = React.createClass({
	"propTypes": {
		"locals": React.PropTypes.object.isRequired
	},
	render: function() {
		var locals = this.props.locals;

		var applicationName = locals.applicationName;
		var pageTitle = this.props.pageTitle;
		var title = applicationName + " - " + pageTitle;

		var js = "var locals = " + JSON.stringify(locals);


/* TESTING */
		var breadcrumbs = [
			{ label: "TEST" },
			{ label: "TEST 2" }
		];
		var now = new Date();
		locals.notifications = [
			{ unread: true, message: 'TEST MESSAGE', from: 'John', time: now }
		];
/* TESTING */

		return (
			<html>
				<head>
					<meta charSet="utf-8" />
					<link rel="stylesheet" type="text/css" href="/css/styles.css" />
					<title>{title}</title>
				</head>
				<body>
					<Header authenticated={locals.authenticated}
							applicationName={applicationName}
							applicationUrl={locals.applicationUrl}
							menus={locals.menus}
							notifications={locals.notifications}
							user={locals.currentUser} />
					<Breadcrumbs breadcrumbs={breadcrumbs} />
					{this.props.children}
					<script type="text/javascript" dangerouslySetInnerHTML={{__html: js}}></script>
					<script type="text/javascript" src={"/js/views/" + locals.template + ".js"}></script>
				</body>
			</html>
		);
	}
});

exports = module.exports = Layout;