'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseBcrypt = require('mongoose-bcrypt');

var _mongooseBcrypt2 = _interopRequireDefault(_mongooseBcrypt);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;

const userSchema = new Schema({
	publicId: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		bcrypt: true
	},
	firstName: {
		type: String,
		require: true
	},
	lastName: {
		type: String,
		require: true
	},
	googleId: String,
	facebookId: String,
	organizations: [{
		type: Schema.Types.ObjectId,
		ref: 'Organization',
		required: true
	}]

}, { timestamps: true });

userSchema.virtual('fullName').get(() => '${this.firstName} ${this.lastName}');

userSchema.plugin(_mongooseBcrypt2.default);

userSchema.pre('validate', function (next) {
	const user = this;

	if (user.isNew) {
		user.publicId = (0, _utils.uidGen)(25);
		user.organizations = [];
	}
	next();
});

exports.default = _mongoose2.default.model('User', userSchema);