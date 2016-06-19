'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseBcrypt = require('mongoose-bcrypt');

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		bcrypt: true
	},
	firstName: String,
	lastName: String,
	googleId: String,
	facebookId: String,
	phone: String
}, { timestamps: true });

userSchema.virtual('fullName').get(() => '${this.firstName} ${this.lastName}');

userSchema.plugin(_mongooseBcrypt2.default);

exports.default = _mongoose2.default.model('User', userSchema);