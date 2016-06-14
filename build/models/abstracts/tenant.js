'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _model = require('../../model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Tenant extends _model2.default {
	constructor(data) {
		super(data);
		this.before('create', 'unshiftOwnerIntoMembers');
	}

	unshiftOwnerIntoMembers() {
		this.get('members').unshift(this.get('owner').get('id').toString());
	}
}
exports.default = Tenant;