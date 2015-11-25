var React = require("react");
var ReactTabs = require("react-tabs");
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

Tabs.setUseDefaultStyles(false);

var ProductVariationActions = require("../actions/ProductVariationActions");
var ProductVariationStore = require("../stores/ProductVariationStore");

var ProductVariation = React.createClass({
	"propTypes": {
		"productVariation": React.PropTypes.object,
		"editable": React.PropTypes.bool.isRequired,
		"isNew": React.PropTypes.bool.isRequired
	},
	_onChange: function() {
		this.setState({
			productVariation: {
				_id: ProductVariationStore.getId(),
				label: ProductVariationStore.getLabel(),
				name: ProductVariationStore.getName(),
				values: ProductVariationStore.getValues()
			}
		});
	},
	componentDidMount: function() {
		ProductVariationStore.addChangeListener(this._onChange);
		ProductVariationStore.loadData(this.props.productVariation);
	},
	getInitialState: function() {
		return {
			productVariation: {
				_id: ProductVariationStore.getId(),
				label: ProductVariationStore.getLabel(),
				name: ProductVariationStore.getName(),
				values: ProductVariationStore.getValues()
			}
		};
	},
	render: function () {
		return (
			<Tabs>
				<TabList>
					<Tab>General</Tab>
					<Tab>Values</Tab>
				</TabList>
				<TabPanel>
					<div className="row">
						<div className="large-6 columns">
							<div className="row">
								<div className="large-4 columns">
									<label className="right inline">Label</label>
								</div>
								<div className="large-8 columns">
									<input disabled={!(this.props.editable)}
										   onChange={ProductVariationActions.updateProductVariationLabel}
										   type="text"
										   value={this.state.productVariation.label} />
								</div>
							</div>
							<div className="row">
								<div className="large-4 columns">
									<label className="right inline">Name</label>
								</div>
								<div className="large-8 columns">
									<input disabled={!(this.props.editable)}
										   onChange={ProductVariationActions.updateProductVariationName}
										   type="text"
										   value={this.state.productVariation.name} />
								</div>
							</div>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					<div className="row">
						<div className="large-6 columns">
							<div className="row">
								<div className="large-12 columns">
									<a className="fancy radius button tiny" href="#" onClick={ProductVariationActions.addValue}>Add Value</a>
								</div>
							</div>
							<div className="table">
								<div className="table-header">
									<div className="table-row">
										<div className="table-cell">
											Label
										</div>
										<div className="table-cell">
											Value
										</div>
										<div className="table-cell">
											&#160;
										</div>
									</div>
								</div>
								<div className="table-body">
									{this.state.productVariation.values.map(function(value, valueIndex) {
										<div className="table-row" key={valueIndex}>
											<div className="table-cell">
												<input onChange={ProductVariationActions.updateLabel.bind(this, valueIndex)}
													   type="text"
													   value={value.label} />
											</div>
											<div className="table-cell">
												<input onChange={ProductVariationActions.updateValue.bind(this, valueIndex)}
													   type="text"
													   value={value.value} />
											</div>
											<div className="table-cell">
												<a className="fancy radius button tiny"
												   href="#"
												   onClick={ProductVariationActions.removeValue.bind(this, valueIndex)}>Remove</a>
											</div>
										</div>
									}, this)}
								</div>
							</div>
						</div>
					</div>
				</TabPanel>
			</Tabs>
		);
	}
});

exports = module.exports = ProductVariation;