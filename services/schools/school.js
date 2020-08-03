const express = require('express');
const School = require('../../models/school');
const fs = require('fs');
var school_dir = './configs/files/schools.json'
var schools = JSON.parse(fs.readFileSync(school_dir, 'utf8')).schools;

const getSchools = async (req, res, next) => {
    try {

        if (schools.length > 0) {
            return res.status(200).json({
                'message': 'Schools Fetched Successfully',
                'data': await schools.filter(x => x.status == 'enabled')
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No schools found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const getSchoolById = async (req, res, next) => {
    try {

        let school = await schools.filter(x => x.id == req.params.id);

        if (school.length == 1) {
            return res.status(200).json({
                'message': `School with Id ${req.params.id} Fetched Successfully`,
                'data': school
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No school found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const createSchool = async (req, res, next) => {
    try {

        const {
            name,
            description,
            idFaculty
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Name is required',
                'field': 'name'
            });
        }

        if (idFaculty === undefined || idFaculty === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Faculty Id is required',
                'field': 'idFaculty'
            });
        }

        let nameExist = await (schools.filter(x => x.name == name).length > 0) ? true : false;

        if (nameExist) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'Name Already Exists',
                'field': 'name'
            });
        }

        const temp = {
            id: schools.length + 1,
            status: "enabled",
            name: name,
            description: (description != undefined) ? description : '',
            idFaculty: idFaculty,
            created_date: new Date(),
            deleted_date: '0001-01-01T00:00:00+4:00'
        }

        schools.push(temp);

        const json = {
            schools: schools
        }

        fs.writeFile(school_dir, JSON.stringify(json), err => { 
            if (err) throw new Error('Something went worng');;  
            return res.status(201).json({
                'message': 'School Created Successfully',
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

const updateSchool = async (req, res, next) => {
    try {

        const schoolId = req.params.id;

        const {
            name,
            description,
            idFaculty
        } = req.body;

        let schoolExist = await (schools.filter(x => x.id == schoolId).length > 0) ? true : false;

        if (!schoolExist) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No school found in the system'
            });
        }

        let schoolIndex = await schools.findIndex(x => x.id == schoolId);

        const temp = {
            name: (name != undefined) ? name : '',
            description: (description != undefined) ? description : '',
            idFaculty: (idFaculty != undefined) ? idFaculty : ''
        }

        if (temp.name != '') schools[schoolIndex].name = temp.name;
        if (temp.description != '') schools[schoolIndex].description = temp.description;
        if (temp.idFaculty != '') schools[schoolIndex].idFaculty = temp.idFaculty;
        
        const json = {
            schools: schools
        }

        if (schoolExist) {
            fs.writeFile(school_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng');;  
                return res.status(200).json({
                    'message': 'School Updated Successfully',
                    'data': schools[schoolIndex]
                });
            }); 
        } else {
            throw new Error('Something went worng');
        }
        console.log('LLEGUE5')

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const deleteSchool = async (req, res, next) => {
    try {

        const schoolId = req.params.id;
        console.log('llegue', schoolId);
        let schoolIndex = await schools.findIndex((x => x.id == schoolId));
        console.log(schoolIndex);
        schools[schoolIndex].status = 'disabled';
        schools[schoolIndex].deleted_date = await new Date();
        console.log('llegue2');

        const json = {
            schools: schools
        }

        if (schoolIndex || schoolIndex == 0) {
            console.log('llegue2.1');
            fs.writeFile(school_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng'); 
                return res.status(204).json({
                    'message': `School with id ${req.params.id} deleted successfully`
                });
            }); 
        } else {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No school found in the system'
            });
        }

        console.log('llegue3');

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

module.exports = {
    getSchools: getSchools,
    getSchoolById: getSchoolById,
    createSchool: createSchool,
    updateSchool: updateSchool,
    deleteSchool: deleteSchool
}