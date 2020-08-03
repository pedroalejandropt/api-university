const { base_entity } = require('./base_entity');
const { entity } = require('./entity');
const { error } = require('./error');
var base = base_entity

var Section = {
    type: 'object',
    properties: {
        id: base.id,
        status: base.status,
        created_date: base.created_date,
        deleted_date: base.deleted_date,
        name: entity.name,
        description: entity.description,
        uc: {
            type: 'integer',
            description: 'Credits Unit',
            example: 1
        },
        semester: {
            type: 'integer',
            description: 'Semester Number',
            example: 1
        },
        type: {
            type: 'string',
            description: 'Type of Section',
            enum: ['mandatory', 'elective'],
            example: 'mandatory'
        },
        ht: {
            type: 'float',
            description: 'Theory Hours',
            example: 12.5
        },
        hp: {
            type: 'float',
            description: 'Practice Hours',
            example: 10.73
        },
        hl: {
            type: 'float',
            description: 'Laboratory Hours',
            example: 2.45
        },
    }
};

var Sections = {
    type: 'object',
    properties: {
      sections: {
        type: 'array',
        items: Section
      }
    }
}

module.exports.sections = {
    get: {
        tags: ['CRUD Section'],
        description: 'Get All Sections',
        parameters: [],
        responses: {
            '200': {
                description: 'Sections were obtained',
                content: {
                    'application/json': {
                        schema: Sections,
                    }
                }
            },
            '404': {
                description: 'ULR or Sections Not Found',
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
        tags: ['CRUD Section'],
        description: 'Create Section',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: Section
                }
            },
            required: true
        },
        responses: {
            '201': {
                description: 'Section Created Successfully'
            },
            '409': {
                description: 'Section Already Exists',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Section Already Exists',
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

module.exports.section_param = {
    get: {
        tags: ['CRUD Section'],
        description: 'Get Section',
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
                description: 'Section was obtained',
                content: {
                    'application/json': {
                        schema: Section
                    }
                }
            },
            '404': {
                description: 'ULR or Section Not Found',
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
            '409': {
                description: 'Section Already Exists',
                content: {
                    'application/json': {
                        schema: error,
                        example: {
                            message: 'Section Already Exists',
                            internal_code: 'ENTITY_ALREAY_EXISTS'
                        }
                    }
                }
            }
        }
    },
    put: {
        tags: ['CRUD Section'],
        description: 'Update Section',
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
                description: 'Section was updated',
                content: {
                    'application/json': {
                        schema: Section
                    }
                }
            },
            '404': {
                description: 'ULR or Section Not Found',
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
        tags: ['CRUD Section'],
        description: 'Delete Section',
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
                description: 'Section was deleted',
            },
            '404': {
                description: 'ULR or Section Not Found',
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

module.exports.section_entity = Section;
module.exports.sections_entity = Sections;