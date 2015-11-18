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

var Customer = require("../../components/Customer");
var CustomerStore = require("../../stores/CustomerStore");
var CustomerActions = require("../../actions/CustomerActions");

var View = React.createClass({
	handleSaveClick: function() {
		CustomerActions.saveCustomer(CustomerStore.getCustomer());
	},
	render: function() {
		var buttonAction,
			pageTitle,
			customer;

		if(typeof(this.props.locals.customer) != "undefined") {
			customer = this.props.locals.customer;
		}

		if((customer != null) && (typeof(customer._id) != "undefined")) {
			pageTitle = "Edit customer";
			buttonAction = "Save";
		} else {
			pageTitle = "New customer";
			buttonAction = "Create";
		}

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a className="right fancy radius button tiny" href="#" onClick={this.handleSaveClick}>
						{buttonAction}
					</a>
				</ActionsBar>
				<Tabs>
					<TabList>
						<Tab>General</Tab>
					</TabList>
					<TabPanel>
						<div className="row">
							<div className="large-6 columns">
								<Customer customer={customer} editable={true} isNew={true} />
							</div>
						</div>
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