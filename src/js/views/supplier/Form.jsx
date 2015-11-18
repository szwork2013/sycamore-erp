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

var Supplier = require("../../components/Supplier");
var SupplierStore = require("../../stores/SupplierStore");
var SupplierActions = require("../../actions/SupplierActions");

var View = React.createClass({
	handleSaveClick: function() {
		SupplierActions.saveSupplier(SupplierStore.getSupplier());
	},
	render: function() {
		var buttonAction,
			pageTitle,
			supplier;

		if(typeof(this.props.locals.supplier) != "undefined") {
			supplier = this.props.locals.supplier;
		}

		if((supplier != null) && (typeof(supplier._id) != "undefined")) {
			pageTitle = "Edit supplier";
			buttonAction = "Save";
		} else {
			pageTitle = "New supplier";
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
								<Supplier supplier={supplier} editable={true} isNew={true} />
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