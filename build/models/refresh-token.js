'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _token = require('./abstracts/token');

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RefreshToken extends _token2.default {
	duration() {
		return 24 * 3600;
	}

	length() {
		return 256;
	}
}
exports.default = RefreshToken;