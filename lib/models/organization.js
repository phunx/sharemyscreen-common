import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const organizationSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	members: [{
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}],
	name: String
}, {timestamps: true});

organizationSchema.pre('save', next => {
	const organization = this;

	organization.members.unshift(organization.owner);
	next();
});

export default mongoose.model('Organization', organizationSchema);
