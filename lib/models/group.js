import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const groupSchema = new Schema({
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

groupSchema.pre('save', next => {
	const group = this;

	group.members.unshift(group.owner);
	next();
});

export default mongoose.model('Group', groupSchema);
