'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const organizationSchema = new Schema({
	publicId: {
		type: String,
		require: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}]
}, { timestamps: true });

organizationSchema.pre('validate', function (next) {
	const organization = this;

	if (organization.isNew) {
		organization.owner = organization.creator;
		organization.members.unshift(organization.owner);
		organization.publicId = (0, _utils.uidGen)(25);
	}
	next();
});

exports.default = _mongoose2.default.model('Organization', organizationSchema);