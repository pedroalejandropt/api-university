const { base_entity } = require('./base_entity');
const { error } = require('./error');
const { models } = require('mongoose');
var base = base_entity

var Enrollment = {
    type: 'object',
    properties: {
        id: base.id,
        status: base.status,
        created_date: base.created_date,
        deleted_date: base.deleted_date,
        type: {
            type: 'string',
            enum: [
                'teacher',
                'student'
            ],
            example: 'teacher' 
        },
        idPerson: {
            type: 'integer',
            description: 'Identification Number of Person',
            example: 1 
        },
        idSection: {
            type: 'integer',
            description: 'Identification Number of Section',
            example: 1 
        }
    }
};

var Enrollments = {
    type: 'object',
    properties: {
      enrollments: {
        type: 'array',
        items: Enrollment
      }
    }
}

module.exports.enrollments = {
    get: {
        tags: ['CRUD Enrollment'],
        description: 'Get All Enrollments',
        parameters: [],
        responses: {
            '200': {
                description: 'Enrollments were obtained',
                content: {
                    'application/json': {
                        schema: Enrollments,
                    }
                }
            },
            '404': {
                description: 'ULR or Enrollments Not Found',
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
        tags: ['CRUD Enrollment'],
        description: 'Create Enrollment',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: Enrollment
                }
            },
            required: true
        },
        responses: {
            '201': {
                description: 'Enrollment Created Successfully'
            },
            '409': {
                description: 'Enrollment Already Exists',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Enrollment Already Exists',
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

module.exports.enrollment_param = {
    delete: {
        tags: ['CRUD Enrollment'],
        description: 'Delete Enrollment',
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
                description: 'Enrollment was deleted',
            },
            '404': {
                description: 'ULR or Enrollment Not Found',
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

module.exports.enrollments_query = {
    get: {
        tags: ['CRUD Enrollment'],
        description: 'Get Enrollments By Type',
        parameters: [
            {
                name: 'section',
                in: 'query',
                type: 'integer',
                required: true,
                description: 'Section Id'
            },
            {
                name: 'type',
                in: 'query',
                type: 'string',
                required: true,
                description: 'Type of Person'
            }
        ],
        responses: {
            '200': {
                description: 'Enrollments were obtained',
                content: {
                    'application/json': {
                        schema: Enrollment
                    }
                }
            },
            '404': {
                description: 'ULR or Enrollments Not Found',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Not found in the system',
                            internal_code: 'BAD_REQUEST_ERROR'
                        }
                    }
                }
            },
            '422': {
                description: 'Missing Queries',
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
}

module.exports.enrollment_entity = Enrollment;
module.exports.enrollments_entity = Enrollments;

