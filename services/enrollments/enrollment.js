const express = require('express');
const Enrollment = require('../../models/enrollment');
const fs = require('fs');
var enrollment_dir = './configs/files/enrollments.json'
var people_dir = './configs/files/people.json'
var enrollments = JSON.parse(fs.readFileSync(enrollment_dir, 'utf8')).enrollments;
var people = JSON.parse(fs.readFileSync(people_dir, 'utf8')).people;

const getEnrollments = async (req, res, next) => {
    try {

        if (enrollments.length > 0) {
            return res.status(200).json({
                'message': 'Enrollments Fetched Successfully',
                'data': await enrollments.filter(x => x.status == 'enabled')
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No enrollments found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const getEnrollmentByType = async (req, res, next) => {
    try {

        if (req.query.section == undefined || req.query.section == '') {
            return res.status(422).json({
                'code': 'REQUIRED_QUERY_MISSING',
                'description': 'Section is required',
                'query': 'section'
            });
        }

        if (req.query.type == undefined || req.query.type == '') {
            return res.status(422).json({
                'code': 'REQUIRED_QUERY_MISSING',
                'description': 'Type is required',
                'query': 'type'
            });
        }

        let enrollmentsList = await enrollments.filter(x => x.idSection == req.query.section && x.type == req.query.type && x.status == 'enabled');

        let peopleList = [];

        enrollmentsList.forEach(x => {
            let person = people.filter(y => y.id == x.idPerson)[0];
            peopleList.push(person)
        });

        if (peopleList.length > 0){
            return res.status(200).json({
                'message': `${req.query.type}s Enrollment Fetched Successfully`,
                'data': peopleList
            });
        } else {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No people found in the system'
            });
        }

        
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const createEnrollment = async (req, res, next) => {
    try {

        const {
            type,
            idPerson,
            idSection
        } = req.body;

        if (type === undefined || type === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Type is required',
                'field': 'type'
            });
        } else {
            if (type != 'teacher'){
                if (type != 'student'){
                    return res.status(422).json({
                        'code': 'CHECK_FIELD',
                        'description': 'Type must be teacher or student',
                        'field': 'type'
                    });
                }
            }
        }

        if (idPerson === undefined || idPerson === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Person Id is required',
                'field': 'idPerson'
            });
        }

        if (idSection === undefined || idSection === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Section Id is required',
                'field': 'idSection'
            });
        }

        let enrollmentExist = await (enrollments.filter(x => x.type == type && x.idPerson == idPerson && x.idSection == idSection).length > 0) ? true : false;

        if (enrollmentExist) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'Enrollment Already Exists',
            });
        }

        const temp = {
            id: enrollments.length + 1,
            status: "enabled",
            type: type,
            idPerson: idPerson,
            idSection: idSection,
            created_date: new Date(),
            deleted_date: '0001-01-01T00:00:00+4:00'
        }

        enrollments.push(temp);

        const json = {
            enrollments: enrollments
        }

        fs.writeFile(enrollment_dir, JSON.stringify(json), err => { 
            if (err) throw new Error('Something went worng');;  
            return res.status(201).json({
                'message': 'Enrollment Created Successfully',
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

const deleteEnrollment = async (req, res, next) => {
    try {

        const enrollmentId = req.params.id;

        let enrollmentIndex = await enrollments.findIndex((x => x.id == enrollmentId));
        enrollments[enrollmentIndex].status = 'disabled';
        enrollments[enrollmentIndex].deleted_date = await new Date();

        const json = {
            enrollments: enrollments
        }

        if (enrollmentIndex || enrollmentIndex == 0) {
            fs.writeFile(enrollment_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng'); 
                return res.status(204).json({
                    'message': `Enrollment with id ${req.params.id} deleted successfully`
                });
            }); 
        } else {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No enrollment found in the system'
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
    getEnrollments: getEnrollments,
    getEnrollmentByType: getEnrollmentByType,
    createEnrollment: createEnrollment,
    deleteEnrollment: deleteEnrollment
}