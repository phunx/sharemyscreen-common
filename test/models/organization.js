const smsCommon = require('../../');
const should = require('should');
const organizationFixture = require("../fixtures/models/organization.json");

let user;

describe("Testing Organization model", function () {

	before(function (done) {
		user = new smsCommon.User(organizationFixture.user);

		user.save(function (err) {
			done(err);
		});
	});

	it("Should create an organization", function (done) {

		const org = new smsCommon.Organization({
			name: organizationFixture.organization.name,
			creator: user
		});

		org.save(function (err) {
			if (err) {
				done(err);
			}
			else {
				org.publicId.length.should.equal(25);

				org.name.should.equal(organizationFixture.organization.name);

				org.creator._id.should.equal(user._id);

				org.owner._id.should.equal(user._id);

				org.members.should.containEql(user._id);
				done();
			}
		});
	})
});
