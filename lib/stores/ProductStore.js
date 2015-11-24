"use strict";

var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var ProductConstants = require("../constants/ProductConstants");
var assign = require("object-assign");
var async = require("async");

var ProductVariationGroupStore = require("./ProductVariationGroupStore");
var SupplierStore = require("./SupplierStore");

var _product = {
	_id: null,
	name: null,
	supplier: {
		_id: null
	},
	productCode: null,
	productType: null,
	productVariationGroup: {
		_id: null
	},
	price: 0
};

var ProductStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function addChangeListener(callback) {
		this.on(ProductConstants.CHANGE_EVENT, callback);
	},

	emitChange: function emitChange() {
		this.emit(ProductConstants.CHANGE_EVENT);
	},

	getId: function getId() {
		return _product._id;
	},

	getProduct: function getProduct() {
		var id, product;

		product = {
			name: this.getName(),
			productCode: this.getProductCode(),
			price: this.getPrice(),
			supplier: SupplierStore.getId(),
			productVariationGroup: ProductVariationGroupStore.getId()
		};

		id = this.getId();
		if (id != null) {
			product._id = id;
		}

		return product;
	},

	getProductCode: function getProductCode() {
		return _product.productCode;
	},

	getName: function getName() {
		return _product.name;
	},

	getPrice: function getPrice() {
		return _product.price;
	},

	getProductType: function getProductType() {
		return _product.productType;
	},

	getProductVariationGroup: function getProductVariationGroup() {
		return ProductVariationGroupStore.getProductVariationGroup();
	},

	getSupplier: function getSupplier() {
		return SupplierStore.getSupplier();
	},

	loadData: function loadData(product) {
		if (product != null) {
			if (typeof product._id != "undefined") {
				_product._id = product._id;
			}
			if (typeof product.productCode != "undefined") {
				this.setProductCode(product.productCode);
			}
			if (typeof product.name != "undefined") {
				this.setName(product.name);
			}
			if (typeof product.price != "undefined") {
				this.setPrice(product.price);
			}
			if (typeof product.type != "undefined") {
				this.setProductType(product.type);
			}
			if (typeof product.supplier != "undefined") {
				this.setSupplier(product.supplier);
			}
			if (typeof product.productVariationGroup != "undefined") {
				this.setProductVariationGroup(product.productVariationGroup);
			}
		}
		this.emitChange();
	},

	removeChangeListener: function removeChangeListener(callback) {
		this.removeListener(ProductConstants.CHANGE_EVENT, callback);
	},

	setProductCode: function setProductCode(productCode) {
		_product.productCode = productCode;
	},

	setName: function setName(name) {
		_product.name = name;
	},

	setPrice: function setPrice(price) {
		_product.price = price;
	},

	setProductType: function setProductType(type) {
		_product.productType = type;
	},

	setProductVariationGroup: function setProductVariationGroup(productVariationGroup) {
		ProductVariationGroupStore.loadData(productVariationGroup);
	},

	setSupplier: function setSupplier(supplier) {
		SupplierStore.loadData(supplier);
	}
});

ProductStore.dispatchToken = AppDispatcher.register(function (payload) {
	var action = payload.action;
	switch (action.actionType) {
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
		case ProductConstants.UPDATE_PRODUCT_TYPE:
			ProductStore.setProductType(action.type);
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
		case ProductConstants.SELECT_PRODUCT_VARIATION_GROUP:
			ProductStore.setProductVariationGroup(action.productVariationGroup);
			ProductStore.emitChange();
			break;
		default:
		// do nothing
	}
});

module.exports = ProductStore;