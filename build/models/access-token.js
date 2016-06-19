'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const accessTokenSchema = new Schema({
	client: {
		type: Schema.Types.ObjectId,
		ref: 'Client',
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	token: {
		type: String
	},
	expiresIn: {
		type: Date
	}
});

accessTokenSchema.virtual('duration').get(() => 3600);
accessTokenSchema.virtual('length').get(() => 256);

accessTokenSchema.pre('save', next => {
	const token = undefined;

	token.token = token.token || (0, _utils.uidGen)(token.length);
	token.expiresIn = token.expiresIn || new Date(new Date().getTime() + token.duration * 1000);
	next();
});

exports.default = _mongoose2.default.model('AccessToken', accessTokenSchema);