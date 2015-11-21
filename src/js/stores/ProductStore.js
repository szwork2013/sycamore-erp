var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductConstants = require("../constants/ProductConstants");
var assign = require("object-assign");
var async = require("async");

var _product = {
	_id: null,
	name: null,
	supplier: null,
	productCode: null,
	price: 0
};

var ProductStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(ProductConstants.CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(ProductConstants.CHANGE_EVENT);
	},

	getId: function() {
		return _product._id;
	},

	getProduct: function() {
		var id,
			supplier,
			product;
		product = {
			name: this.getName(),
			productCode: this.getProductCode(),
			price: this.getPrice()
		};
		id = this.getId();
		if(id != null) {
			product._id = id;
		}
		supplier = this.getSupplier();
		if(supplier !== null && typeof supplier === 'object') {
			if(typeof supplier._id !== "undefined") {
				product.supplier = supplier._id;
			}
		}
		return product;
	},

	getProductCode: function() {
		return _product.productCode;
	},

	getName: function() {
		return _product.name;
	},

	getPrice: function() {
		return _product.price;
	},

	getSupplier: function() {
		return _product.supplier;
	},

	loadData: function(product) {
		if(product != null) {
			if(typeof(product._id) != "undefined") {
				_product._id = product._id;
			}
			if(typeof(product.productCode) != "undefined") {
				this.setProductCode(product.productCode);
			}
			if(typeof(product.name) != "undefined") {
				this.setName(product.name);
			}
			if(typeof(product.price) != "undefined") {
				this.setPrice(product.price);
			}
			if(typeof(product.supplier) != "undefined") {
				this.setSupplier(product.supplier);
			}
		}
		this.emitChange();
	},

	removeChangeListener: function(callback) {
		this.removeListener(ProductConstants.CHANGE_EVENT, callback);
	},

	setProductCode: function(productCode) {
		_product.productCode = productCode;
	},

	setName: function(name) {
		_product.name = name;
	},

	setPrice: function(price) {
		_product.price = price;
	},

	setSupplier: function(supplier) {
		_product.supplier = supplier;
	}
});

ProductStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case ProductConstants.UPDATE_PRODUCT:
			ProductStore.loadData(action.product);
		break;
		case ProductConstants.UPDATE_PRODUCT_CODE:
			ProductStore.setProductCode(action.productCode);
			ProductStore.emitChange();
		break;
		case ProductConstants.UPDATE_PRODUCT_NAME:
			ProductStore.setName(action.name);
			ProductStore.emitChange();
		break;
		case ProductConstants.SELECT_PRODUCT_SUPPLIER:
			ProductStore.setSupplier(action.supplier);
			ProductStore.emitChange();
		break;
		case ProductConstants.UPDATE_PRODUCT_PRICE:
			ProductStore.setPrice(action.price);
			ProductStore.emitChange();
		break;
		default:
			// do nothing
	}
});

module.exports = ProductStore;