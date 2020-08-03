const express = require('express');
const Person = require('../../models/person');
const fs = require('fs');
var person_dir = './configs/files/people.json'
var people = JSON.parse(fs.readFileSync(person_dir, 'utf8')).people;

const getPeople = async (req, res, next) => {
    try {

        if (people.length > 0) {
            return res.status(200).json({
                'message': 'People Fetched Successfully',
                'data': await people.filter(x => x.status == 'enabled')
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No people found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const getPersonById = async (req, res, next) => {
    try {

        let person = await people.filter(x => x.id == req.params.id);

        if (person.length == 1) {
            return res.status(200).json({
                'message': `Person with Id ${req.params.id} Fetched Successfully`,
                'data': person
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No person found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const createPerson = async (req, res, next) => {
    try {

        const {
            identifier,
            firstName,
            lastName,
        } = req.body;

        if (identifier === undefined || identifier === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Identifier is required',
                'field': 'identifier'
            });
        }

        if (firstName === undefined || firstName === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'First name is required',
                'field': 'firstName'
            });
        }

        if (lastName === undefined || lastName === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Last name is required',
                'field': 'lastName'
            });
        }

        let personExist = await (people.filter(x => x.indentifier == identifier).length > 0) ? true : false;

        if (personExist) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'Person Already Exists'
            });
        }

        const temp = {
            id: people.length + 1,
            status: "enabled",
            identifier: identifier,
            firstName: firstName,
            lastName: lastName,
            created_date: new Date(),
            deleted_date: '0001-01-01T00:00:00+4:00'
        }

        people.push(temp);

        const json = {
            people: people
        }

        fs.writeFile(person_dir, JSON.stringify(json), err => { 
            if (err) throw new Error('Something went worng');;  
            return res.status(201).json({
                'message': 'Person Created Successfully',
                'data': temp
            });
        }); 

    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const updatePerson = async (req, res, next) => {
    try {

        const personId = req.params.id;

        const {
            identifier,
            firstName,
            lastName
        } = req.body;

        let personExist = await (people.filter(x => x.id == personId).length > 0) ? true : false;

        if (!personExist) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No person found in the system'
            });
        }

        const temp = {
            identifier: (identifier != undefined) ? identifier : '',
            firstName: (firstName != undefined) ? firstName : '',
            lastName: (lastName != undefined) ? lastName : ''
        }

        let personIndex = await people.findIndex((x => x.id == personId));
        if (temp.identifier != '') people[personIndex].identifier = temp.identifier;
        if (temp.firstName != '') people[personIndex].firstName = temp.firstName;
        if (temp.lastName != '') people[personIndex].lastName = temp.lastName;

        const json = {
            people: people
        }

        if (personExist) {
            fs.writeFile(person_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng');;  
                return res.status(200).json({
                    'message': 'Person Updated Successfully',
                    'data': people[personIndex]
                });
            }); 
        } else {
            throw new Error('Something went worng');
        }
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const deletePerson = async (req, res, next) => {
    try {

        const personId = req.params.id;

        let personIndex = await people.findIndex((x => x.id == personId));
        people[personIndex].status = 'disabled';
        people[personIndex].deleted_date = await new Date();

        const json = {
            people: people
        }

        if (personIndex || personIndex == 0) {
            fs.writeFile(person_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng'); 
                return res.status(204).json({
                    'message': `Person with id ${req.params.id} deleted successfully`
                });
            }); 
        } else {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No person found in the system'
            });
        }

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

module.exports = {
    getPeople: getPeople,
    getPersonById: getPersonById,
    createPerson: createPerson,
    updatePerson: updatePerson,
    deletePerson: deletePerson
}