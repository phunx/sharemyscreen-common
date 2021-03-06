'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const clientSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	key: {
		type: String,
		unique: true
	},
	secret: {
		type: String,
		unique: true
	},
	trusted: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

clientSchema.pre('validate', function (next) {
	const client = this;

	if (client.isNew) {
		client.key = (0, _utils.uidGen)(16);
		client.secret = (0, _utils.uidGen)(32);
	}
	next();
});

exports.default = _mongoose2.default.model('Client', clientSchema);