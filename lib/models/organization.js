import mongoose from 'mongoose';
import {uidGen} from '../utils';

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
	publicId: {
		type: String,
		require: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}]
}, { timestamps: true });

organizationSchema.pre('validate', function (next) {
	const organization = this;

	if (organization.isNew) {
		organization.owner = organization.creator;
		organization.members.unshift(organization.owner);
		organization.publicId = uidGen(25);
	}
	next();
});

organizationSchema.methods.invite = function (user) {
	this.members.push(user);
	return this.save();
};

organizationSchema.methods.kick = function (user) {
	this.members.splice(this.members.indexOf(user), 1);
	return this.save();
};



export default mongoose.model('Organization', organizationSchema);
