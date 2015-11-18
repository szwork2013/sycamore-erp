var AppDispatcher = require("sycamore-platform-components").Dispatcher;
var EventEmitter = require("events").EventEmitter;
var PropertyConstants = require("../constants/PropertyConstants");
var assign = require("object-assign");
var async = require("async");

var _property = {
	_id: null,
	accessArrangements: null,
	address: {
		line1: null,
		line2: null,
		line3: null,
		line4: null,
		postCode: null
	},
	telephone: null
};

var PropertyStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function(callback) {
		this.on(PropertyConstants.CHANGE_EVENT, callback);
	},

	emitChange: function() {
		this.emit(PropertyConstants.CHANGE_EVENT);
	},

	getAccessArrangements: function() {
		return _property.accessArrangements;
	},

	getAddressLine1: function() {
		return _property.address.line1;
	},

	getAddressLine2: function() {
		return _property.address.line2;
	},

	getAddressLine3: function() {
		return _property.address.line3;
	},

	getAddressLine4: function() {
		return _property.address.line4;
	},

	getAddressPostCode: function() {
		return _property.address.postCode;
	},

	getTelephone: function() {
		return _property.telephone;
	},

	removeChangeListener: function(callback) {
		this.removeListener(PropertyConstants.CHANGE_EVENT, callback);
	},

	setAccessArrangements: function(accessArrangements) {
		_property.accessArrangements = accessArrangements;
	},

	setAddressLine1: function(line1) {
		_property.address.line1 = line1;
	},

	setAddressLine2: function(line2) {
		_property.address.line2 = line2;
	},

	setAddressLine3: function(line3) {
		_property.address.line3 = line3;
	},

	setAddressLine4: function(line4) {
		_property.address.line4 = line4;
	},

	setAddressPostCode: function(postCode) {
		_property.address.postCode = postCode;
	},

	setTelephone: function(telephone) {
		_property.telephone = telephone;
	}
});

PropertyStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;
	switch(action.actionType) {
		case UPDATE_PROPERTY:
		break;
		case UPDATE_PROPERTY_ADDRESS_LINE1:
			PropertyStore.setAddressLine1(action.line1);
			PropertyStore.emitChange();
		break;
		case UPDATE_PROPERTY_ADDRESS_LINE2:
			PropertyStore.setAddressLine2(action.line2);
			PropertyStore.emitChange();
		break;
		case UPDATE_PROPERTY_ADDRESS_LINE3:
			PropertyStore.setAddressLine3(action.line3);
			PropertyStore.emitChange();
		break;
		case UPDATE_PROPERTY_ADDRESS_LINE4:
			PropertyStore.setAddressLine4(action.line4);
			PropertyStore.emitChange();
		break;
		case UPDATE_PROPERTY_ADDRESS_POSTCODE:
			PropertyStore.setAddressPostCode(action.postCode);
			PropertyStore.emitChange();
		break;
		case UPDATE_PROPERTY_ACCESS_ARRANGEMENTS:
			PropertyStore.setAccessArrangements(action.accessArrangements);
			PropertyStore.emitChange();
		break;
		case UPDATE_PROPERTY_TELEPHONE:
			PropertyStore.setTelephone(action.telephone);
			PropertyStore.emitChange();
		break;
		default:
			// do nothing
	}
});

module.exports = PropertyStore;