var React = require("react");
var ReactDOM = require("react-dom");
var Layout = require("sycamore-platform-components").Layout;
var ActionsBar = require("sycamore-platform-components").ActionsBar;
var CustomersSelect = require("../../components/CustomersSelect");

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
					<div className="row">
						<ul data-tab="data-tab" role="tablist" className="tabs">
							<li role="presentation" className="tab-title active"><a href="#general" role="tab" tabIndex="0" aria-selected="true" aria-controls="general">General</a></li>
						</ul>
					</div>
					<div className="row">
						<div className="large-4 columns">
							<div className="tabs-content">
								<section role="tabpanel" aria-hidden="false" id="general" className="content active">
									<div className="row">
										<div className="large-4 columns">
											<label for="name" className="right inline">Name</label>
										</div>
										<div className="large-8 columns">
											<input type="text" name="property[name]"/>
										</div>
									</div>
									<div className="row">
										<div className="large-4 columns">
											<label className="right inline">Customer</label>
										</div>
										<div className="large-8 columns">
											<CustomersSelect name={"property[customer]"} onChange={this.handleCustomerChange} />
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</form>
			</Layout>
		);
	}
});

if(process.browser) {
	ReactDOM.render(<View locals={locals} />, document);
}

exports = module.exports = View;