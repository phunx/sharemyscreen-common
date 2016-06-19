'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseRelationship = require('mongoose-relationship');

var _mongooseRelationship2 = _interopRequireDefault(_mongooseRelationship);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const messageSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'Room',
		childPath: 'messages',
		required: true
	},
	body: {
		type: String,
		required: true
	},
	isRead: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

messageSchema.plugin(_mongooseRelationship2.default, { relationshipPathName: 'room' });

exports.default = _mongoose2.default.model('Message', messageSchema);