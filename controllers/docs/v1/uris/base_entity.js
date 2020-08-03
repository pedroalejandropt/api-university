module.exports.base_entity = {
    id: {
        type: 'integer',
        description: 'Identification Number',
        example: 1
    },
    status: {
        type: 'string',
        enum: [
            'enabled',
            'disabled'
        ],
        example: 'enabled' 
    },
    created_date: {
        type: 'date',
        description: 'Date of Creation',
        example: '2020-08-14T03:23:45+4:00' 
    },
    delete_date: {
        type: 'date',
        description: 'Date of Delete',
        example: '2020-08-15T03:23:45+4:00' 
    }
};