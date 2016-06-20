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
	trusted: {
		type: Boolean,
		default: false
	}
}, {timestamps: true});

clientSchema.pre('validate', function (next) {
	const client = this;

	if (client.isNew) {
		client.key = uidGen(16);
		client.secret = uidGen(32);
	}
	next();
});

export default mongoose.model('Client', clientSchema);
