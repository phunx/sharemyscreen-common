'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _model = require('../../model');

var _model2 = _interopRequireDefault(_model);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Token extends _model2.default {
	constructor(data) {
		super(data);
		this.set('token', this.get('token') || _utils2.default.uidGen(this.length()));
		this.set('expires_in', this.get('expires_in') || this._expirationDate);
	}

	get _expirationDate() {
		return new Date(new Date().getTime() + this.duration() * 1000);
	}
}
exports.default = Token;