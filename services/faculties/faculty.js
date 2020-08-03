const express = require('express');
const Faculty = require('../../models/faculty');
const fs = require('fs');
var faculty_dir = './configs/files/faculties.json'
var faculties = JSON.parse(fs.readFileSync(faculty_dir, 'utf8')).faculties;

const getFaculties = async (req, res, next) => {
    try {

        if (faculties.length > 0) {
            return res.status(200).json({
                'message': 'Faculties Fetched Successfully',
                'data': await faculties.filter(x => x.status == 'enabled')
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No faculties found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const getFacultyById = async (req, res, next) => {
    try {

        let faculty = await faculties.filter(x => x.id == req.params.id);

        if (faculty.length == 1) {
            return res.status(200).json({
                'message': `Faculty with Id ${req.params.id} Fetched Successfully`,
                'data': faculty
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No faculty found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const createFaculty = async (req, res, next) => {
    try {

        const {
            name,
            description
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Name is required',
                'field': 'name'
            });
        }

        let nameExist = await (faculties.filter(x => x.name == name).length > 0) ? true : false;

        if (nameExist) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'Name Already Exists',
                'field': 'name'
            });
        }

        const temp = {
            id: faculties.length + 1,
            status: "enabled",
            name: name,
            description: (description != undefined) ? description : '',
            created_date: new Date(),
            deleted_date: '0001-01-01T00:00:00+4:00'
        }

        faculties.push(temp);

        const json = {
            faculties: faculties
        }

        fs.writeFile(faculty_dir, JSON.stringify(json), err => { 
            if (err) throw new Error('Something went worng');;  
            return res.status(201).json({
                'message': 'Faculty Created Successfully',
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

const updateFaculty = async (req, res, next) => {
    try {

        const facultyId = req.params.id;

        const {
            name,
            description
        } = req.body;

        let facultyExist = await (faculties.filter(x => x.id == facultyId).length > 0) ? true : false;

        if (!facultyExist) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No faculty found in the system'
            });
        }

        const temp = {
            name: (name != undefined) ? name : '',
            description: (description != undefined) ? description : ''
        }

        let facultyIndex = await faculties.findIndex((x => x.id == facultyId));
        if (temp.description != '') faculties[facultyIndex].name = temp.name;
        if (temp.description != '') faculties[facultyIndex].description = temp.description;

        const json = {
            faculties: faculties
        }

        if (facultyIndex || facultyIndex == 0) {
            fs.writeFile(faculty_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng');;  
                return res.status(200).json({
                    'message': 'Faculty Updated Successfully',
                    'data': faculties[facultyIndex]
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

const deleteFaculty = async (req, res, next) => {
    try {

        const facultyId = req.params.id;

        let facultyIndex = await faculties.findIndex((x => x.id == facultyId));
        faculties[facultyIndex].status = 'disabled';
        faculties[facultyIndex].deleted_date = await new Date();

        const json = {
            faculties: faculties
        }

        if (facultyIndex || facultyIndex == 0) {
            fs.writeFile(faculty_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng'); 
                return res.status(204).json({
                    'message': `Faculty with id ${req.params.id} deleted successfully`
                });
            }); 
        } else {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No faculty found in the system'
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
    getFaculties: getFaculties,
    getFacultyById: getFacultyById,
    createFaculty: createFaculty,
    updateFaculty: updateFaculty,
    deleteFaculty: deleteFaculty
}