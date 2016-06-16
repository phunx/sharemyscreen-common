import Mongorito from 'mongorito';
import _ from 'lodash';
import {snakeCase, camelCase} from 'change-case';

export default class Model extends Mongorito.Model {
	constructor(data, options) {
		super(Model._snakeCaseRename(data), options);

		this._required = [];
		this._validate = {};
		this._relationship = {};

		this.after('save', '_updateRelationships');
		this.before('save', '_convertNestedModelsToId');
	}

	default(key, defaultValue) {
		if (_.isObject(key)) {
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
		const validators = _.castArray(validator);

		this._validate[key] = validators;
	}

	relationship(key, parent, childPath) {
		this._relationship[key] = {parent, childPath};
	}

	* _validateModel() {
	}

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

	* _convertNestedModelsToId() {
		const attrs = this.get();

		for (const key in attrs) {
			if ({}.hasOwnProperty.call(attrs, key)) {
				const attr = _.castArray(attrs[key]);
				for (let i = 0; i < attr.length; i++) {
					if (attr[i] instanceof Model) {
						const nested = attr[i];
						if (!(nested.get('id') || nested.get('_id'))) {
							yield nested.save();
						}

						const id = nested.get('id') || nested.get('_id');

						if (_.isArray(attrs[key])) {
							attr[i] = id.toString();
						} else {
							this.set(key, id.toString());
						}
					}
				}
			}
		}
	}

	* _updateRelationships() {
		for (const key in this._relationship) {
			if ({}.hasOwnProperty.call(this._relationship, key)) {
				const relationship = this._relationship[key];
				const parentIds = _.castArray(this.get(key));

				for (let i = 0; i < parentIds.length; i++) {
					const parent = yield relationship.parent.findById(parentIds[i].toString());

					if (!parent) {
						continue;
					}

					if (!_.isArray(parent.get(relationship.childPath))) {
						parent.set(relationship.childPath,
							parent.get(relationship.childPath) ?
							[parent.get(relationship.childPath)] : []
						);
					}

					const children = parent.get(relationship.childPath);

					if (!_.includes(children, this.get('_id'))) {
						children.push(this.get('_id'));
						parent.save();
					}
				}
			}
		}
	}

	static _camelCaseRename(data) {
		return _.mapKeys(data, (val, key) => {
			return camelCase(key);
		});
	}

	static _snakeCaseRename(data) {
		return _.mapKeys(data, (val, key) => {
			return snakeCase(key);
		});
	}
}
