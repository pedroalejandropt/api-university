const { base_entity } = require('./base_entity');
const { entity } = require('./entity');
const { error } = require('./error');
var base = base_entity

var School = {
    type: 'object',
    properties: {
        id: base.id,
        status: base.status,
        created_date: base.created_date,
        deleted_date: base.deleted_date,
        name: entity.name,
        description: entity.description
    }
};

var Schools = {
    type: 'object',
    properties: {
      schools: {
        type: 'array',
        items: School
      }
    }
}

module.exports.schools = {
    get: {
        tags: ['CRUD School'],
        description: 'Get All Schools',
        parameters: [],
        responses: {
            '200': {
                description: 'Schools were obtained',
                content: {
                    'application/json': {
                        schema: Schools,
                    }
                }
            },
            '404': {
                description: 'ULR or Schools Not Found',
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
        tags: ['CRUD School'],
        description: 'Create School',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: School
                }
            },
            required: true
        },
        responses: {
            '201': {
                description: 'School Created Successfully'
            },
            '409': {
                description: 'School Already Exists',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'School Already Exists',
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

module.exports.school_param = {
    get: {
        tags: ['CRUD School'],
        description: 'Get School',
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
                description: 'School was obtained',
                content: {
                    'application/json': {
                        schema: School
                    }
                }
            },
            '404': {
                description: 'ULR or School Not Found',
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
        tags: ['CRUD School'],
        description: 'Update School',
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
                description: 'School was updated',
                content: {
                    'application/json': {
                        schema: School
                    }
                }
            },
            '404': {
                description: 'ULR or School Not Found',
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
        tags: ['CRUD School'],
        description: 'Delete School',
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
                description: 'School was deleted',
            },
            '404': {
                description: 'ULR or School Not Found',
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

module.exports.school_entity = School;
module.exports.schools_entity = Schools;