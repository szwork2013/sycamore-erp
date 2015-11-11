var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ReactTabs = require("react-tabs");
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;
var Customer = require("../../components/Customer");

Tabs.setUseDefaultStyles(false);

var View = React.createClass({
	render: function() {
		var pageTitle = "New customer";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<form action="/sycamore-erp/customer" encType="application/x-www-form-urlencoded" method="POST">
					<ActionsBar pageTitle={pageTitle}>
						<input type="submit" className="right fancy radius button tiny" value="Create" />
					</ActionsBar>
					<Tabs>
						<TabList>
							<Tab>General</Tab>
						</TabList>
						<TabPanel>
							<div className="row">
								<div className="large-6 columns">
									<Customer editable={true} isNew={true} />
								</div>
							</div>
						</TabPanel>
					</Tabs>
				</form>
			</Layout>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;