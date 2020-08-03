const { base_entity } = require('./base_entity');
const { error } = require('./error');
var base = base_entity

var Person = {
    type: 'object',
    properties: {
        id: base.id,
        status: base.status,
        created_date: base.created_date,
        deleted_date: base.deleted_date,
        identifier: {
            type: 'string',
            description: 'Country Identification Number',
            example: 'V-XX.XXX.XXX'
        },
        firstName: {
            type: 'string',
            description: 'First Name of Person',
            example: 'Pablito'
        },
        lastName: {
            type: 'string',
            description: 'Last Name of Person',
            example: 'Clavito'
        }
    }
};

var People = {
    type: 'object',
    properties: {
      people: {
        type: 'array',
        items: Person
      }
    }
}

module.exports.people = {
    get: {
        tags: ['CRUD Person'],
        description: 'Get All People',
        parameters: [],
        responses: {
            '200': {
                description: 'People were obtained',
                content: {
                    'application/json': {
                        schema: People,
                    }
                }
            },
            '404': {
                description: 'ULR or People Not Found',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Not found in the system',
                            internal_code: 'BAD_REQUEST_ERROR'
                        }
                    }
                }
            }
        }
    },
    post: {
        tags: ['CRUD Person'],
        description: 'Create Person',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: Person
                }
            },
            required: true
        },
        responses: {
            '201': {
                description: 'Person Created Successfully'
            },
            '409': {
                description: 'Person Already Exists',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Person Already Exists',
                            internal_code: 'ENTITY_ALREAY_EXISTS'
                        }
                    }
                }
            },
            '422': {
                description: 'Missing Parameters',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Field is required',
                            internal_code: 'REQUIRED_FIELD_MISSING'
                        }
                    }
                }
            }
        }
    }
};

module.exports.person_param = {
    get: {
        tags: ['CRUD Person'],
        description: 'Get Person',
        parameters: [
            {
                id: 'x-id',
                in: 'path',
                name: 'id',
                schema: base.id,
                required: true,
                description: 'Identification'
            },
        ],
        responses: {
            '200': {
                description: 'Person was obtained',
                content: {
                    'application/json': {
                        schema: Person
                    }
                }
            },
            '404': {
                description: 'ULR or Person Not Found',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Not found in the system',
                            internal_code: 'BAD_REQUEST_ERROR'
                        }
                    }
                }
            }
        }
    },
    put: {
        tags: ['CRUD Person'],
        description: 'Update Person',
        parameters: [
            {
                id: 'x-id',
                in: 'path',
                name: 'id',
                schema: base.id,
                required: true,
                description: 'Identification'
            },
        ],
        responses: {
            '200': {
                description: 'Person was updated',
                content: {
                    'application/json': {
                        schema: Person
                    }
                }
            },
            '404': {
                description: 'ULR or Person Not Found',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Not found in the system',
                            internal_code: 'BAD_REQUEST_ERROR'
                        }
                    }
                }
            }
        }
    },
    delete: {
        tags: ['CRUD Person'],
        description: 'Delete Person',
        parameters: [
            {
                id: 'x-id',
                in: 'path',
                name: 'id',
                schema: base.id,
                required: true,
                description: 'Identification'
            },
        ],
        responses: {
            '204': {
                description: 'Person was deleted',
            },
            '404': {
                description: 'ULR or Person Not Found',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Not found in the system',
                            internal_code: 'BAD_REQUEST_ERROR'
                        }
                    }
                }
            }
        }
    },
};

module.exports.person_entity = Person;
module.exports.people_entity = People;