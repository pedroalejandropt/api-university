const express = require('express');
const Section = require('../../models/section');
const fs = require('fs');
var section_dir = './configs/files/sections.json'
var sections = JSON.parse(fs.readFileSync(section_dir, 'utf8')).sections;

const getSections = async (req, res, next) => {
    try {

        if (sections.length > 0) {
            return res.status(200).json({
                'message': 'Sections Fetched Successfully',
                'data': await sections.filter(x => x.status == 'enabled')
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No sections found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const getSectionById = async (req, res, next) => {
    try {

        let section = await sections.filter(x => x.id == req.params.id);

        if (section.length == 1) {
            return res.status(200).json({
                'message': `Section with Id ${req.params.id} Fetched Successfully`,
                'data': section
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No section found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'Something went wrong, Please try again'
        });
    }
}

const createSection = async (req, res, next) => {
    try {

        const {
            name,
            description,
            uc,
            semester,
            type,
            ht,
            hp,
            hl,
            idSchool
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Name is required',
                'field': 'name'
            });
        }

        if (uc === undefined || uc === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Credit Unit is required',
                'field': 'uc'
            });
        }

        if (semester === undefined || semester === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Semester is required',
                'field': 'semester'
            });
        }

        if (type === undefined || type === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Type is required',
                'field': 'type'
            });
        } else if (type != 'mandatory'){
            if (type != 'elective'){
                return res.status(422).json({
                    'code': 'CHECK_FIELD',
                    'description': 'Type must be mandatory or elective',
                    'field': 'type'
                });
            }
        }

        if (ht === undefined || ht === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Theory Hours is required',
                'field': 'ht'
            });
        }

        if (hp === undefined || hp === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Practice Hours is required',
                'field': 'hp'
            });
        }

        if (hl === undefined || hl === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Laboratory Hours is required',
                'field': 'hl'
            });
        }

        let sectionExist = await (sections.filter(x => x.name == name && x.idSchool == idSchool).length > 0) ? true : false;

        if (sectionExist) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'Section Already Exists'
            });
        }

        const temp = {
            id: sections.length + 1,
            status: "enabled",
            name: name,
            description: description,
            uc: uc,
            semester:  semester,
            type: type,
            ht: ht,
            hp: hp,
            hl: hl,
            idSchool: idSchool,
            created_date: new Date(),
            deleted_date: '0001-01-01T00:00:00+4:00'
        }

        sections.push(temp);

        const json = {
            sections: sections
        }

        fs.writeFile(section_dir, JSON.stringify(json), err => { 
            if (err) throw new Error('Something went worng');;  
            return res.status(201).json({
                'message': 'Section Created Successfully',
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

const updateSection = async (req, res, next) => {
    try {

        const sectionId = req.params.id;

        const {
            name,
            description,
            uc,
            semester,
            type,
            ht,
            hp,
            hl,
            idSchool
        } = req.body;

        let sectionExist = await (sections.filter(x => x.id == sectionId).length > 0) ? true : false;

        if (!sectionExist) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No section found in the system'
            });
        }

        if (name){
            let section = await sections.filter(x => x.id == sectionId)[0]
            let sectionRepeat = await (sections.filter(x => x.name == name && x.idSchool == section.idSchool && x.id != sectionId).length > 0) ? true : false;
            if (sectionRepeat) {
                return res.status(409).json({
                    'code': 'ENTITY_ALREAY_EXISTS',
                    'description': 'Section Already Exists'
                });
            }
        }

        if (type){
            if (type != 'mandatory'){
                if (type != 'elective'){
                    return res.status(422).json({
                        'code': 'CHECK_FIELD',
                        'description': 'Type must be mandatory or elective',
                        'field': 'type'
                    });
                }
            }
        }

        const temp = {
            name: (name != undefined) ? name : '',
            description: (description != undefined) ? description : '',
            uc: (uc != undefined) ? uc : -1,
            semester: (semester != undefined) ? semester : -1,
            type: (type != undefined) ? type : '',
            ht: (ht != undefined) ? ht : -1,
            hp: (hp != undefined) ? hp : -1,
            hl: (hl != undefined) ? hl : -1,
            idSchool: (idSchool != undefined) ? idSchool : ''
        }

        console.log(temp);

        let sectionIndex = await sections.findIndex((x => x.id == sectionId));
        if (temp.name != '') sections[sectionIndex].name = temp.name;
        if (temp.description != '') sections[sectionIndex].description = temp.description;
        if (temp.uc != -1) sections[sectionIndex].uc = temp.uc;
        if (temp.semester != -1) sections[sectionIndex].semester = temp.semester;
        if (temp.type = '') sections[sectionIndex].type = temp.type;
        if (temp.ht != -1) sections[sectionIndex].ht = temp.ht;
        if (temp.hp != -1) sections[sectionIndex].hp = temp.hp;
        if (temp.hl != -1) sections[sectionIndex].hl = temp.hl;
        if (temp.idSchool != '') sections[sectionIndex].idSchool = temp.idSchool;

        const json = {
            sections: sections
        }

        if (sectionExist) {
            fs.writeFile(section_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng');;  
                return res.status(200).json({
                    'message': 'Section Updated Successfully',
                    'data': sections[sectionIndex]
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

const deleteSection = async (req, res, next) => {
    try {

        const sectionId = req.params.id;

        let sectionIndex = await sections.findIndex((x => x.id == sectionId));
        sections[sectionIndex].status = 'disabled';
        sections[sectionIndex].deleted_date = await new Date();

        const json = {
            sections: sections
        }

        if (sectionIndex || sectionIndex == 0) {
            fs.writeFile(section_dir, JSON.stringify(json), err => { 
                if (err) throw new Error('Something went worng'); 
                return res.status(204).json({
                    'message': `Section with id ${req.params.id} deleted successfully`
                });
            }); 
        } else {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No section found in the system'
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
    getSections: getSections,
    getSectionById: getSectionById,
    createSection: createSection,
    updateSection: updateSection,
    deleteSection: deleteSection
}