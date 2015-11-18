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

var Product = require("../../components/Product");
var ProductStore = require("../../stores/ProductStore");
var ProductActions = require("../../actions/ProductActions");

var View = React.createClass({
	handleSaveClick: function() {
		ProductActions.saveProduct(ProductStore.getProduct());
	},
	render: function() {
		var buttonAction,
			pageTitle,
			product;

		if(typeof(this.props.locals.product) != "undefined") {
			product = this.props.locals.product;
		}

		if((product != null) && (typeof(product._id) != "undefined")) {
			pageTitle = "Edit product";
			buttonAction = "Save";
		} else {
			pageTitle = "New product";
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
								<Product product={product} editable={true} isNew={true} />
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