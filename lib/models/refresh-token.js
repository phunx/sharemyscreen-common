import mongoose from 'mongoose';
import {uidGen} from '../utils';

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
	client: {
		type: Schema.Types.ObjectId,
		ref: 'Client',
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	token: {
		type: String,
		required: true
	},
	scopes: [{
		type: String,
		required: true
	}],
	expiresIn: {
		type: Date,
		required: true
	}
});

refreshTokenSchema.virtual('duration').get(() => 24 * 3600);
refreshTokenSchema.virtual('length').get(() => 256);

refreshTokenSchema.pre('validate', function (next) {
	const token = this;

	if (token.isNew) {
		token.token = uidGen(token.length);
		token.expiresIn = new Date(new Date().getTime() + token.duration * 1000);
	}
	next();
});

export default mongoose.model('RefreshToken', refreshTokenSchema);
