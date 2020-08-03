const express = require('express');
const personService = require('../../services/people/person');
let router = express.Router();

router.get('/', personService.getPeople);

router.get('/:id', personService.getPersonById);

router.post('/', personService.createPerson);

router.put('/:id', personService.updatePerson);

router.delete('/:id', personService.deletePerson);


module.exports = router;