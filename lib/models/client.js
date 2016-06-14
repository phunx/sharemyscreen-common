import Model from '../model';
import {Utils} from '../utils';

export default class Client extends Model {
	constructor(data) {
		super(data);
		this.default({
			trusted: false,
			scope: ['offline_access'],
			key: Utils.uidGen(16),
			secret: Utils.uidGen(32)
		});
	}
}
