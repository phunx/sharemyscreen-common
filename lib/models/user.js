import mongoose from 'mongoose';
import bcrypt from 'mongoose-bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		bcrypt: true
	},
	firstName: String,
	lastName: String,
	googleId: String,
	facebookId: String,
	phone: String
}, {timestamps: true});

userSchema.virtual('fullName').get(() => '${this.firstName} ${this.lastName}');

userSchema.plugin(bcrypt);

export default mongoose.model('User', userSchema);
