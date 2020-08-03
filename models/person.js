const BaseEntity = require('./base-entity');

class Person extends BaseEntity {
    identifier;
    firstName;
    lastName;
}

module.exports = Person;