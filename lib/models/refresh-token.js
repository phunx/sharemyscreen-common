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
		ref: 'User'
	},
	token: {
		type: String
	},
	expiresIn: {
		type: Date
	}
});

refreshTokenSchema.virtual('duration').get(() => 24 * 3600);
refreshTokenSchema.virtual('length').get(() => 256);

refreshTokenSchema.pre('save', next => {
	const token = this;

	token.token = token.token || uidGen(token.length);
	token.expiresIn = token.expiresIn || new Date(new Date().getTime() + token.duration * 1000);
	next();
});

export default mongoose.model('RefreshToken', refreshTokenSchema);
