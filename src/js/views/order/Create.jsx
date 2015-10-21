var React = require("react");
var Layout = require("../Layout");
var ActionsBar = require("../../components/ActionsBar");

var CustomersSelect = require("../../components/CustomersSelect");
var PropertiesSelect = require("../../components/PropertiesSelect");
var ProductsSelect = require("../../components/ProductsSelect");

var View = React.createClass({
	getInitialState: function() {
		return {};
	},
	handleCustomerChange: function(value) {

	},
	handlePropertyChange: function(value) {

	},
	handleProductChange: function(value) {

	},
	render: function() {
		var pageTitle = "New order";

		return (
			<Layout pageTitle={pageTitle} locals={this.props.locals}>
				<ActionsBar pageTitle={pageTitle}>
					<a href="/order/create" className="right fancy radius button tiny">
						<i className="in-button-icon fa fa-fw fa-plus"></i> Save
					</a>
				</ActionsBar>
				<div className="row">
					<div className="large-6 columns">
						<fieldset>
							<div className="row">
								<div className="large-2 columns">
									<label className="inline">Customer</label>
								</div>
								<div className="large-8 columns">
									<CustomersSelect name={"order[customer]"} onChange={this.handleCustomerChange} />
								</div>
								<div className="large-2 columns">
									<input className="right fancy radius button tiny" type="button" value="New" />
								</div>
							</div>
						</fieldset>
					</div>
					<div className="large-6 columns">
						<fieldset>
							<div className="row">				
								<div className="large-2 columns">
									<label className="inline">Property</label>
								</div>
								<div className="large-8 columns">
									<PropertiesSelect name={"order[property]"} onChange={this.handlePropertyChange} />
								</div>
								<div className="large-2 columns">
									<input className="right fancy radius button tiny" type="button" value="New" />
								</div>
							</div>
						</fieldset>
					</div>
				</div>

				<div className="row">
					<div className="large-12 columns">
						<div className="table">
							<div className="table-head">
								<div className="table-row">
									<div className="table-cell large-10">
										Product
									</div>
									<div className="table-cell large-1">
										Quantity
									</div>
									<div className="table-cell large-1">
										Price
									</div>
								</div>
							</div>
							<div className="table-body">
								<div className="table-row">
									<div className="table-cell">
										<ProductsSelect name={"order[products][]"} onChange={this.handleProductChange} />
									</div>
									<div className="table-cell">
										<input type="number" />
									</div>
									<div className="table-cell">

									</div>
								</div>
							</div>
							<div className="table-foot">
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">Sub Total</div>
									<div className="table-cell"></div>
								</div>
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell">VAT</div>
									<div className="table-cell"></div>
								</div>
								<div className="table-row">
									<div className="table-cell">&#160;</div>
									<div className="table-cell"><strong>Total</strong></div>
									<div className="table-cell"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
});

if(process.browser) {
	React.render(<View locals={locals} />, document);
}

exports = module.exports = View;