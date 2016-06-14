'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _token = require('./abstracts/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestToken extends _token2.default {
	constructor(data) {
		super(data);
		this.set('redirectURI', data.redirectURI);
	}

	duration() {
		return 3600;
	}

	length() {
		return 256;
	}
}
exports.default = RequestToken;