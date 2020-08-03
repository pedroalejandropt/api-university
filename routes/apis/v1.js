const express = require('express');
const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../../controllers/docs/v1/documentation');

const facultyController = require('../../controllers/apis/faculty');
const schoolController = require('../../controllers/apis/school');
const personController = require('../../controllers/apis/person');
const sectionController = require('../../controllers/apis/section');
const enrollmentController = require('../../controllers/apis/enrollment');

let router = express.Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
router.use('/faculties', facultyController);
router.use('/schools', schoolController);
router.use('/people', personController);
router.use('/sections', sectionController);
router.use('/enrollments', enrollmentController);

module.exports = router;