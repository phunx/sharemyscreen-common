import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roomSchema = new Schema({
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
	messages: [{
		type: Schema.Types.ObjectId,
		ref: 'Message'
	}],
	name: String
}, {timestamps: true});

roomSchema.pre('save', next => {
	const room = this;

	room.members.unshift(room.owner);
	next();
});

export default mongoose.model('Room', roomSchema);
