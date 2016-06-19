import mongoose from 'mongoose';
import relationship from 'mongoose-relationship';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	room: {
		type: Schema.Types.ObjectId,
		ref: 'Room',
		childPath: 'messages',
		required: true
	},
	body: {
		type: String,
		required: true
	},
	isRead: {
		type: Boolean,
		default: false
	}
}, {timestamps: true});

messageSchema.plugin(relationship, {relationshipPathName: 'room'});

export default mongoose.model('Message', messageSchema);
