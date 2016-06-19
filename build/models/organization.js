'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const organizationSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}],
	name: String
}, { timestamps: true });

organizationSchema.pre('save', next => {
	const organization = undefined;

	organization.members.unshift(organization.owner);
	next();
});

exports.default = _mongoose2.default.model('Organization', organizationSchema);