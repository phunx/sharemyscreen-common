const smsCommon = require('../../');
const should = require('should');
const userFixture = require("../fixtures/models/user.json");


describe("Testing User model", function () {

	it("Should create an user using password", function (done) {
		let publicId;
		const cUser = new smsCommon.User(userFixture.password);

		cUser.save(function (err) {
			if (err) {
				done(err);
			}
			else {
				cUser.publicId.should.not.be.null();
				cUser.publicId.length.should.equal(25);
				publicId = cUser.publicId;

				cUser.email.should.equal(userFixture.password.email);

				cUser.password.should.not.equal(userFixture.password.password);

				cUser.firstName.should.equal(userFixture.password.firstName);

				cUser.lastName.should.equal(userFixture.password.lastName);

				cUser.organizations.length.should.equal(0);

				cUser.email += "e";
				cUser.save(function (err) {
					cUser.publicId.should.equal(publicId);
					done(err);
				});
			}
		});
	});

	it("Should create an user using google", function (done) {
		const cUser = new smsCommon.User(userFixture.google);

		cUser.save(function (err) {
			if (err) {
				done(err);
			}
			else {
				cUser.publicId.should.not.be.null();
				cUser.publicId.length.should.equal(25);

				cUser.email.should.equal(userFixture.google.email);

				cUser.firstName.should.equal(userFixture.google.firstName);

				cUser.lastName.should.equal(userFixture.google.lastName);

				cUser.googleId.should.equal(userFixture.google.googleId);

				cUser.organizations.length.should.equal(0);

				done();
			}
		});
	});

	it("Should create an user using facebook", function (done) {
		const cUser = new smsCommon.User(userFixture.facebook);

		cUser.save(function (err) {
			if (err) {
				done(err);
			}
			else {
				cUser.publicId.should.not.be.null();
				cUser.publicId.length.should.equal(25);

				cUser.email.should.equal(userFixture.facebook.email);

				cUser.firstName.should.equal(userFixture.facebook.firstName);

				cUser.lastName.should.equal(userFixture.facebook.lastName);

				cUser.facebookId.should.equal(userFixture.facebook.facebookId);

				cUser.organizations.length.should.equal(0);

				done();
			}
		});
	});

});
