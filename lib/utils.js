export const Utils = {
	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	uidGen(len) {
		const buf = [];
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charlen = chars.length;

		for (let i = 0; i < len; ++i) {
			buf.push(chars[this.getRandomInt(0, charlen - 1)]);
		}

		return buf.join('');
	}
};
