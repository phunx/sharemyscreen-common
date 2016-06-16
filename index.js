'use strict';

const _ = require('lodash');

const lib = {
	Mongorito: require('mongorito'),
	Model: require('./build/model'),
	Utils: require('./build/utils').Utils,
	Tenant: require('./build/models/abstracts/tenant'),
	Token: require('./build/models/abstracts/token'),
	AccessToken: require('./build/models/access-token'),
	Client: require('./build/models/client'),
	Group: require('./build/models/group'),
	Message: require('./build/models/message'),
	Organization: require('./build/models/organization'),
	RefreshToken: require('./build/models/refresh-token'),
	RequestToken: require('./build/models/request-token'),
	Room: require('./build/models/room'),
	User: require('./build/models/user')
};

module.exports = _.mapValues(lib, val => {
	if (val.__esModule && _.has(val, 'default')) {
		return val.default;
	}
	return val;
});
