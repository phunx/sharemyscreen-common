const smsCommon = require('../../');
const should = require('should');
const accessTokenFixture = require("../fixtures/models/access-token.json");

let user;
let client;

describe("Testing access_token model", function () {

	before(function (done) {

		user = new smsCommon.User(accessTokenFixture.user);
		client = new smsCommon.Client(accessTokenFixture.client);

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

	it("Should generated an access token", function (done) {

		const accessToken = new smsCommon.AccessToken({
			client: client,
			user: user,
			scopes: accessTokenFixture.token.scopes
		});

		accessToken.save(function (err) {
			if (err) {
				done(err);
			}
			else {
				accessToken.token.length.should.equal(256);

				accessToken.user._id.should.equal(user._id);
				
				accessToken.client._id.should.equal(client._id);
				done();
			}
		});
	})
});
