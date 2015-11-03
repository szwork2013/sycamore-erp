var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var ReactTabs = require("react-tabs");
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;
var CustomersSelect = require("../../components/CustomersSelect");
var Property = require("../../components/Property");

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	handleCustomerChange: function(value) {
		console.log(value);
	},
	render: function() {
		var pageTitle = "New property";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<form action="/sycamore-erp/property" encType="application/x-www-form-urlencoded" method="POST">
					<ActionsBar pageTitle={pageTitle}>
						<input type="submit" className="right fancy radius button tiny" value="Create" />
					</ActionsBar>
					<Tabs>
						<Tab>General</Tab>
						<TabPanel>
							<Property editable={true} isNew={true} />
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