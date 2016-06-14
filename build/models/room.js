'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tenant = require('./abstracts/tenant');

var _tenant2 = _interopRequireDefault(_tenant);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Room extends _tenant2.default {
	constructor(data) {
		super(data);
		this.before('create', 'defaultName');
		this.relationship('members', _user2.default, 'rooms');
		this.default('messages', []);
	}

	defaultName() {
		this.set('name', this.get('name') || this.get('members')[0].get('name'));
	}
}
exports.default = Room;