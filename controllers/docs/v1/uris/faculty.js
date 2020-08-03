const { base_entity } = require('./base_entity');
const { entity } = require('./entity');
const { error } = require('./error');
var base = base_entity

var Faculty = {
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

var Faculties = {
    type: 'object',
    properties: {
      faculties: {
        type: 'array',
        items: Faculty
      }
    }
}

module.exports.faculties = {
    get: {
        tags: ['CRUD Faculty'],
        description: 'Get All Faculties',
        parameters: [],
        responses: {
            '200': {
                description: 'Faculties were obtained',
                content: {
                    'application/json': {
                        schema: Faculties,
                    }
                }
            },
            '404': {
                description: 'ULR or Faculties Not Found',
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
        tags: ['CRUD Faculty'],
        description: 'Create Faculty',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: Faculty
                }
            },
            required: true
        },
        responses: {
            '201': {
                description: 'Faculty Created Successfully'
            },
            '409': {
                description: 'Faculty Already Exists',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Faculty Already Exists',
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

module.exports.faculty_param = {
    get: {
        tags: ['CRUD Faculty'],
        description: 'Get Faculty',
        parameters: [
            {
                id: 'x-id',
                name: 'id',
                in: 'path',
                schema: base.id,
                required: true,
                description: 'Identification'
            },
        ],
        responses: {
            '200': {
                description: 'Faculty was obtained',
                content: {
                    'application/json': {
                        schema: Faculty
                    }
                }
            },
            '404': {
                description: 'ULR or Faculty Not Found',
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
        tags: ['CRUD Faculty'],
        description: 'Update Faculty',
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
                description: 'Faculty was updated',
                content: {
                    'application/json': {
                        schema: Faculty
                    }
                }
            },
            '404': {
                description: 'ULR or Faculty Not Found',
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
        tags: ['CRUD Faculty'],
        description: 'Delete Faculty',
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
                description: 'Faculty was deleted',
            },
            '404': {
                description: 'ULR or Faculty Not Found',
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

module.exports.faculty_entity = Faculty;
module.exports.faculties_entity = Faculties;