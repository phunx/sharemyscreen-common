import mongoose from 'mongoose';
import {uidGen} from '../utils';

const Schema = mongoose.Schema;

const requestTokenSchema = new Schema({
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

requestTokenSchema.virtual('duration').get(() => 3600);
requestTokenSchema.virtual('length').get(() => 256);

requestTokenSchema.pre('save', next => {
	const token = this;

	if (token.isNew) {
		token.token = uidGen(token.length);
		token.expiresIn = new Date(new Date().getTime() + token.duration * 1000);
	}
	next();
});

export default mongoose.model('RequestToken', requestTokenSchema);
