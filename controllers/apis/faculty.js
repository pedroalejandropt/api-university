const express = require('express');
const facultyService = require('../../services/faculties/faculty');
let router = express.Router();

router.get('/', facultyService.getFaculties);

router.get('/:id', facultyService.getFacultyById);

router.post('/', facultyService.createFaculty);

router.put('/:id', facultyService.updateFaculty);

router.delete('/:id', facultyService.deleteFaculty);


module.exports = router;