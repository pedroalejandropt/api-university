const express = require('express');
const schoolService = require('../../services/schools/school');
let router = express.Router();

router.get('/', schoolService.getSchools);

router.get('/:id', schoolService.getSchoolById);

router.post('/', schoolService.createSchool);

router.put('/:id', schoolService.updateSchool);

router.delete('/:id', schoolService.deleteSchool);


module.exports = router;