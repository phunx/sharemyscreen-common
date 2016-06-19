import mongoose from 'mongoose';
import {uidGen} from '../utils';

const Schema = mongoose.Schema;

const clientSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	key: {
		type: String,
		unique: true
	},
	secret: {
		type: String,
		unique: true
	},
	scope: {
		type: [String],
		default: ['offline_access']
	},
	trusted: {
		type: Boolean,
		default: false
	}
}, {timestamps: true});

clientSchema.pre('save', next => {
	const client = this;

	client.key = client.key || uidGen(16);
	client.secret = client.secret || uidGen(32);
	next();
});

export default mongoose.model('Client', clientSchema);
