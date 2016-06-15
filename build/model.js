'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongorito = require('mongorito');

var Mongorito = _interopRequireWildcard(_mongorito);

var _is_js = require('is_js');

var is = _interopRequireWildcard(_is_js);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _changeCase = require('change-case');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class Model extends Mongorito.Model {
	constructor(data, options) {
		super(Model._snakeCaseRename(data), options);

		this._required = [];
		this._validate = {};
		this._relationship = {};

		this.after('save', '_updateRelationships');
		this.before('save', '_convertNestedModelsToId');
	}

	default(key, defaultValue) {
		if (_lodash2.default.isObject(key)) {
			const keypairs = key;
			for (const key in keypairs) {
				if ({}.hasOwnProperty.call(keypairs, key)) {
					this.default(key, keypairs[key]);
				}
			}
		} else {
			this.set(key, this.get(key) || defaultValue);
		}
	}

	require(key) {
		if (this._required.length === 0) {
			this.before('save', '_validateRequired');
		}
		this._required.push(key);
	}

	validate(key, validator) {
		const validators = _lodash2.default.castArray(validator);

		this._validate[key] = validators;
	}

	relationship(key, parent, childPath) {
		this._relationship[key] = { parent, childPath };
	}

	*_validateModel() {}

	_validateRequired() {
		const missing = [];

		this._required.forEach(key => {
			if (!this.get(key)) {
				missing.push(key);
			}
		});

		if (missing.length !== 0) {
			throw new Error('${this.constructor.name}: Missing fields: ${missing}');
		}
	}

	*_convertNestedModelsToId() {
		const attrs = this.get();

		for (const key in attrs) {
			if ({}.hasOwnProperty.call(attrs, key)) {
				const attr = _lodash2.default.castArray(attrs[key]);
				for (let i = 0; i < attr.length; i++) {
					if (attr[i] instanceof Model) {
						const nested = attr[i];
						if (!(nested.get('id') || nested.get('_id'))) {
							yield nested.save();
						}

						const id = nested.get('id') || nested.get('_id');

						if (_lodash2.default.isArray(attrs[key])) {
							attr[i] = id.toString();
						} else {
							this.set(key, id.toString());
						}
					}
				}
			}
		}
	}

	*_updateRelationships() {
		for (const key in this._relationship) {
			if ({}.hasOwnProperty.call(this._relationship, key)) {
				const relationship = this._relationship[key];
				const parentIds = _lodash2.default.castArray(this.get(key));

				for (let i = 0; i < parentIds.length; i++) {
					const parent = yield relationship.parent.findById(parentIds[i].toString());

					if (!parent) {
						continue;
					}

					if (!is.array(parent.get(relationship.childPath))) {
						parent.set(relationship.childPath, parent.get(relationship.childPath) ? [parent.get(relationship.childPath)] : []);
					}

					const children = parent.get(relationship.childPath);

					if (!is.inArray(this.get('_id'), children)) {
						children.push(this.get('_id'));
						parent.save();
					}
				}
			}
		}
	}

	static _camelCaseRename(data) {
		const rename = require('rename-keys');

		return rename(data, key => {
			return (0, _changeCase.camelCase)(key);
		});
	}

	static _snakeCaseRename(data) {
		const rename = require('rename-keys');

		return rename(data, key => {
			return (0, _changeCase.snakeCase)(key);
		});
	}
}

exports.default = Model;