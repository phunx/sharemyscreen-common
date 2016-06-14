import Model from '../../model';

export default class Tenant extends Model {
	constructor(data) {
		super(data);
		this.before('create', 'unshiftOwnerIntoMembers');
	}

	unshiftOwnerIntoMembers() {
		this.get('members').unshift(this.get('owner').get('id').toString());
	}
}
