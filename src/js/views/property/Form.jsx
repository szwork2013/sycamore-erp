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

var Property = require("../../components/Property");
var PropertyStore = require("../../stores/PropertyStore");
var PropertyActions = require("../../actions/PropertyActions")

var View = React.createClass({
	handleSaveClick: function() {
		PropertyActions.saveProperty(PropertyStore.getProperty());
	},
	render: function() {
		var buttonAction,
			pageTitle,
			property;

		if(typeof(this.props.locals.property) != "undefined") {
			property = this.props.locals.property;
		}

		if((property != null) && (typeof(property._id) != "undefined")) {
			pageTitle = "Edit property";
			buttonAction = "Save";
		} else {
			pageTitle = "New property";
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
								<Property property={property} editable={true} isNew={true} />
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