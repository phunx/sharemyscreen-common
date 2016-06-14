import Model from '../../model';
import Utils from '../../utils';

export default class Token extends Model {
	constructor(data) {
		super(data);
		this.set('token', this.get('token') || Utils.uidGen(this.length()));
		this.set('expires_in', this.get('expires_in') || this._expirationDate);
	}

	get _expirationDate() {
		return new Date(new Date().getTime() + this.duration() * 1000);
	}
}
