const Entity = require('./entity');
const BaseEntity = require('./base-entity');

class Enrollment extends BaseEntity {
    type;
    idPerson;
    idSection;
}

module.exports = Enrollment;