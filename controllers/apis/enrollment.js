const express = require('express');
const enrollomentService = require('../../services/enrollments/enrollment');
let router = express.Router();

router.get('/', enrollomentService.getEnrollments);

router.get('/list', enrollomentService.getEnrollmentByType);

router.post('/', enrollomentService.createEnrollment);

router.delete('/:id', enrollomentService.deleteEnrollment);


module.exports = router;