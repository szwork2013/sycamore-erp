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

var Order = require("../../components/Order");
var OrderStore = require("../../stores/OrderStore");
var OrderActions = require("../../actions/OrderActions");

var View = React.createClass({
	handleSaveClick: function() {
		var d = domain.create();

		d.on("error", function(error) {
			console.log(error);
		});

		d.run(function() {
			OrderStore.getOrder(d.intercept(function(order) {
				OrderActions.saveOrder(order);
			}));
		});
	},
	render: function() {
		var buttonAction,
			pageTitle,
			order;

		if(typeof(this.props.locals.order) != "undefined") {
			order = this.props.locals.order;
		}

		if((order != null) && (typeof(order._id) != "undefined")) {
			pageTitle = "Edit order";
			buttonAction = "Save";
		} else {
			pageTitle = "New order";
			buttonAction = "Create";
		}

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a className="right fancy radius button tiny" href="#" onClick={this.handleSaveClick}>
						{buttonAction}
					</a>
					<a className="right fancy radius button tiny" href="/sycamore-erp/order/asdsd/email">
						Email Order
					</a>
				</ActionsBar>
				<Tabs>
					<TabList>
						<Tab>Order</Tab>
					</TabList>
					<TabPanel>
						<Order order={order} editable={true} isNew={true} />
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