const express = require('express');
const sectionService = require('../../services/sections/section');
let router = express.Router();

router.get('/', sectionService.getSections);

router.get('/:id', sectionService.getSectionById);

router.post('/', sectionService.createSection);

router.put('/:id', sectionService.updateSection);

router.delete('/:id', sectionService.deleteSection);


module.exports = router;