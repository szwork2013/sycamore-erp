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
	handleSaveClick: function() {
		var d = domain.create();

		d.on("error", function(error) {
			console.log(error);
		});

		d.run(function() {
			QuoteStore.getQuote(d.intercept(function(quote) {
				QuoteActions.saveQuote(quote);
			}));
		});
	},
	renderSaveButton: function() {
		var buttonAction;

		if((typeof this.props.locals != "undefined") && (typeof this.props.locals.quote != "undefined") && (this.props.locals.quote != null) && (typeof this.props.locals.quote._id != "undefined")) {
			buttonAction = "Save";
		} else {
			buttonAction = "Create";
		}

		return (
			<a className="right fancy radius button tiny" href="#" onClick={this.handleSaveClick}>
				{buttonAction}
			</a>
		);
	},
	renderEmailButton: function() {
		var quoteId;

		if((typeof this.props.locals != "undefined") && (typeof this.props.locals.quote != "undefined") && (this.props.locals.quote != null) && (typeof this.props.locals.quote._id != "undefined")) {
			return (
				<a className="right fancy radius button tiny" href={"/sycamore-erp/quote/" + this.props.locals.quote._id + "/email"}>
					Email Quote
				</a>
			);
		}
	},
	renderButtons: function() {
		return (
			<div>
				{this.renderSaveButton()}
				{this.renderEmailButton()}
			</div>
		);


	},
	render: function() {
		var buttonAction,
			pageTitle,
			quote;

		if(typeof(this.props.locals.quote) != "undefined") {
			quote = this.props.locals.quote;
		}

		if((quote != null) && (typeof(quote._id) != "undefined")) {
			pageTitle = "Edit quote";
			buttonAction = "Save";
		} else {
			pageTitle = "New quote";
			buttonAction = "Create";
		}

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					{this.renderButtons()}
				</ActionsBar>
				<Tabs>
					<TabList>
						<Tab>Quote</Tab>
						<Tab>Emails</Tab>
					</TabList>
					<TabPanel>
						<Quote quote={quote} editable={true} isNew={true} />
					</TabPanel>
					<TabPanel>
					</TabPanel>
				</Tabs>
			</Layout>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;