import Token from './abstracts/token';

export default class RefreshToken extends Token {
	duration() {
		return 24 * 3600;
	}

	length() {
		return 256;
	}
}
