'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const groupSchema = new Schema({
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

groupSchema.pre('save', next => {
	const group = undefined;

	group.members.unshift(group.owner);
	next();
});

exports.default = _mongoose2.default.model('Group', groupSchema);