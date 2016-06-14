import Token from './abstracts/token';

export default class AccessToken extends Token {
	duration() {
		return 3600;
	}

	length() {
		return 256;
	}
}
