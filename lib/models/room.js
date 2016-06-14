import Tenant from './abstracts/tenant';
import User from './user';

export default class Room extends Tenant {
	constructor(data) {
		super(data);
		this.before('create', 'defaultName');
		this.relationship('members', User, 'rooms');
		this.default('messages', []);
	}

	defaultName() {
		this.set('name', this.get('name') || this.get('members')[0].get('name'));
	}
}
