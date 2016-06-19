'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const roomSchema = new Schema({
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
	messages: [{
		type: Schema.Types.ObjectId,
		ref: 'Message'
	}],
	name: String
}, { timestamps: true });

roomSchema.pre('save', next => {
	const room = undefined;

	room.members.unshift(room.owner);
	next();
});

exports.default = _mongoose2.default.model('Room', roomSchema);