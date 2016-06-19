import mongoose from 'mongoose';
import {uidGen} from '../utils';

const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
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

accessTokenSchema.virtual('duration').get(() => 3600);
accessTokenSchema.virtual('length').get(() => 256);

accessTokenSchema.pre('save', next => {
	const token = this;

	token.token = token.token || uidGen(token.length);
	token.expiresIn = token.expiresIn || new Date(new Date().getTime() + token.duration * 1000);
	next();
});

export default mongoose.model('AccessToken', accessTokenSchema);
