'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _model = require('../model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User extends _model2.default {
	constructor(data) {
		super(data, { safe: true });
		this.require('username');
		this.require('email');
		if (data.password !== undefined) {
			this.before('create', 'encryptPassword');
		}
	}

	toJSON() {
		const json = super.toJSON();

		json.password = undefined;
		return json;
	}

	comparePassword(password) {
		return new Promise((resolve, reject) => {
			_bcrypt2.default.compare(password, this.get('password'), (err, isMatch) => {
				if (err) {
					return reject(err);
				}
				return resolve(isMatch);
			});
		}).then(isMatch => {
			return isMatch;
		});
	}

	*encryptPassword() {
		yield new Promise((resolve, reject) => {
			_bcrypt2.default.genSalt(5, (err, salt) => {
				if (err) {
					return reject(err);
				}
				_bcrypt2.default.hash(this.get('password'), salt, (err, password) => {
					if (err) {
						return reject(err);
					}
					this.set('password', password);
					resolve();
				});
			});
		});
	}
}
exports.default = User;