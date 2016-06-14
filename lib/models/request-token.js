import Token from './abstracts/token';

export default class RequestToken extends Token {
	constructor(data) {
		super(data);
		this.set('redirectURI', data.redirectURI);
	}

	duration() {
		return 3600;
	}

	length() {
		return 256;
	}
}
