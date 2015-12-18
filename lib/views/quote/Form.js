"use strict";

var domain = require("domain");
var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ReactTabs = require("react-tabs");
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Tabs.setUseDefaultStyles(false);

var Quote = require("../../components/Quote");
var QuoteStore = require("../../stores/QuoteStore");
var QuoteActions = require("../../actions/QuoteActions");

var View = React.createClass({
	displayName: "View",

	handleSaveClick: function handleSaveClick() {
		var d = domain.create();

		d.on("error", function (error) {
			console.log(error);
		});

		d.run(function () {
			QuoteStore.getQuote(d.intercept(function (quote) {
				QuoteActions.saveQuote(quote);
			}));
		});
	},
	renderSaveButton: function renderSaveButton() {
		var buttonAction;

		if (typeof this.props.locals != "undefined" && typeof this.props.locals.quote != "undefined" && this.props.locals.quote != null && typeof this.props.locals.quote._id != "undefined") {
			buttonAction = "Save";
		} else {
			buttonAction = "Create";
		}

		return React.createElement(
			"a",
			{ className: "right fancy radius button tiny", href: "#", onClick: this.handleSaveClick },
			buttonAction
		);
	},
	renderEmailButton: function renderEmailButton() {
		var quoteId;

		if (typeof this.props.locals != "undefined" && typeof this.props.locals.quote != "undefined" && this.props.locals.quote != null && typeof this.props.locals.quote._id != "undefined") {
			return React.createElement(
				"a",
				{ className: "right fancy radius button tiny", href: "/sycamore-erp/quote/" + this.props.locals.quote._id + "/email" },
				"Email Quote"
			);
		}
	},
	renderButtons: function renderButtons() {
		return React.createElement(
			"div",
			null,
			this.renderSaveButton(),
			this.renderEmailButton()
		);
	},
	render: function render() {
		var buttonAction, pageTitle, quote;

		if (typeof this.props.locals.quote != "undefined") {
			quote = this.props.locals.quote;
		}

		if (quote != null && typeof quote._id != "undefined") {
			pageTitle = "Edit quote";
			buttonAction = "Save";
		} else {
			pageTitle = "New quote";
			buttonAction = "Create";
		}

		return React.createElement(
			Layout,
			{ pageTitle: pageTitle, locals: this.props.locals },
			React.createElement(
				ActionsBar,
				{ pageTitle: pageTitle },
				this.renderButtons()
			),
			React.createElement(
				Tabs,
				null,
				React.createElement(
					TabList,
					null,
					React.createElement(
						Tab,
						null,
						"Quote"
					),
					React.createElement(
						Tab,
						null,
						"Emails"
					)
				),
				React.createElement(
					TabPanel,
					null,
					React.createElement(Quote, { quote: quote, editable: true, isNew: true })
				),
				React.createElement(TabPanel, null)
			)
		);
	}
});

if (process.browser) {
	ReactDOM.render(React.createElement(View, { locals: locals }), document);
}

exports = module.exports = View;