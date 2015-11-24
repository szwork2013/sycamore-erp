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

var ProductVariationGroup = require("../../components/ProductVariationGroup");
var ProductVariationGroupStore = require("../../stores/ProductVariationGroupStore");
var ProductVariationGroupActions = require("../../actions/ProductVariationGroupActions");

var View = React.createClass({
	handleSaveClick: function() {
		ProductVariationGroupActions.saveProductVariationGroup(ProductVariationGroupStore.getProductVariationGroup());
	},
	render: function() {
		var buttonAction,
			pageTitle,
			productVariationGroup;

		if(typeof(this.props.locals.productVariationGroup) != "undefined") {
			productVariationGroup = this.props.locals.productVariationGroup;
		}

		if((productVariationGroup != null) && (typeof(productVariationGroup._id) != "undefined")) {
			pageTitle = "Edit product variation group";
			buttonAction = "Save";
		} else {
			pageTitle = "New product variation group";
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
								<ProductVariationGroup productVariationGroup={productVariationGroup} editable={true} isNew={true} />
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