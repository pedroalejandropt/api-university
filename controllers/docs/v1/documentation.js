const { people, person_param, person_entity, people_entity } = require('./uris/person');
const { faculties, faculty_param, faculty_entity, faculties_entity } = require('./uris/faculty');
const { schools, school_param, school_entity, schools_entity } = require('./uris/school');
const { sections, section_param, section_entity, sections_entity } = require('./uris/section');
const { enrollments, enrollment_param, enrollments_query, enrollment_entity, enrollments_entity } = require('./uris/enrollment');
const { error } = require('./uris/error');

module.exports = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'API-Distribuidos',
    description: 'Plataforma API que proporciona un amplio acceso a los datos públicos de la universidad.',
    contact: {
      name: 'Annemarie Rolo',
      email: 'arolo.16@est.ucab.edu.ve',
    }
  },
  servers: [
    {
      url: 'http://localhost:3000/api/v1',
      description: 'Local server'
    }
  ],
  security: [
    {
      ApiKeyAuth: []
    }
  ],
  tags: [],
  paths: {
    '/faculties': faculties,
    '/faculties/{id}': faculty_param,
    '/schools': schools,
    '/schools/{id}': school_param,
    '/sections': sections,
    '/sections/{id}': section_param,
    '/people': people,
    '/people/{id}': person_param,
    '/enrollments': enrollments,
    '/enrollments/{id}': enrollment_param,
    '/enrollments/list?section={id}&type={type}': enrollments_query
  },
  components: {
    schemas: {
      Faculty: faculty_entity,
      Faculties: faculties_entity,
      School: school_entity,
      Schools: schools_entity,
      Section: section_entity,
      Sections: sections_entity,
      Person: person_entity,
      People: people_entity,
      Enrollment: enrollment_entity,
      Enrollments: enrollments_entity,
      Error: error
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key'
      }
    }
  }
};