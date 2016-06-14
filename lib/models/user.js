import bcrypt from 'bcrypt';
import Model from '../model';

export default class User extends Model {
	constructor(data) {
		super(data, {safe: true});
		this.require('username');
		this.require('email');
		if (data.password !== undefined) {
			this.before('create', 'encryptPassword');
		}
	}

	toJSON() {
		const json = super.toJSON();

		json.password = undefined;
		return json;
	}

	comparePassword(password) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, this.get('password'), (err, isMatch) => {
				if (err) {
					return reject(err);
				}
				return resolve(isMatch);
			});
		}).then(isMatch => {
			return isMatch;
		});
	}

	* encryptPassword() {
		yield new Promise((resolve, reject) => {
			bcrypt.genSalt(5, (err, salt) => {
				if (err) {
					return reject(err);
				}
				bcrypt.hash(this.get('password'), salt, (err, password) => {
					if (err) {
						return reject(err);
					}
					this.set('password', password);
					resolve();
				});
			});
		});
	}
}
