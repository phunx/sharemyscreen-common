import mongoose from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import {uidGen} from '../utils';

const Schema = mongoose.Schema;

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

}, {timestamps: true});

userSchema.virtual('fullName').get(() => '${this.firstName} ${this.lastName}');

userSchema.plugin(bcrypt);

userSchema.pre('validate', function (next) {
	const user = this;

	if (user.isNew) {
		user.publicId = uidGen(25);
		user.organizations = [];
	}
	next();
});

export default mongoose.model('User', userSchema);
