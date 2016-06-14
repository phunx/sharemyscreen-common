'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _model = require('../model');

var _model2 = _interopRequireDefault(_model);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Client extends _model2.default {
	constructor(data) {
		super(data);
		this.default({
			trusted: false,
			scope: ['offline_access'],
			key: _utils.Utils.uidGen(16),
			secret: _utils.Utils.uidGen(32)
		});
	}
}
exports.default = Client;