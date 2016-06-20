const requireDir = require("require-dir");
const should = require('should');
const mongoose = require('mongoose');

before(function (done) {
	console.log("Initializing database connection ...");
	mongoose.connection.on("open", function () {
		console.log("Connected !");

		console.log("Dropping test database ...");
		mongoose.connection.db.dropDatabase(function (err) {
			console.log("Database dropped");
			done(err);
		});
	});
	
	mongoose.connection.on("error", function (err) {
		console.log("Connection failed ...");
		done(err);
	});

	mongoose.connect("mongodb://localhost:27017/sms-common-test");

});

describe("Testing sharemyscreen-common package", function () {

	describe("Testing models", function () {
		requireDir("./models")
	});
});
