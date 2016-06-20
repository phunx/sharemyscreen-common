const smsCommon = require('../../');
const should = require('should');
const refreshTokenFixture = require("../fixtures/models/refresh-token.json");

let user;
let client;

describe("Testing refresh_token model", function () {

	before(function (done) {

		user = new smsCommon.User(refreshTokenFixture.user);
		client = new smsCommon.Client(refreshTokenFixture.client);

		user.save(function (err) {
			if (err) {
				done(err);
			}
			else {
				client.save(function (err) {
					if (err) {
						done(err);
					}
					else {
						done();
					}
				});
			}
		});
	});

	it("Should generated a refresh token", function (done) {

		const refreshToken = new smsCommon.RefreshToken({
			client: client,
			user: user,
			scopes: refreshTokenFixture.token.scopes
		});

		refreshToken.save(function (err) {
			if (err) {
				done(err);
			}
			else {
				refreshToken.token.length.should.equal(256);

				refreshToken.user._id.should.equal(user._id);

				refreshToken.client._id.should.equal(client._id);
				done();
			}
		});
	})
});
