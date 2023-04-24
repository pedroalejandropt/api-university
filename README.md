# API University

API University is a sample project that provides a RESTful API for managing universities, faculties, and courses. It is built with ASP.NET Core and uses Entity Framework Core to interact with a SQL Server database. This project is meant to serve as an example of how to build a modern web API with the .NET framework and best practices.

## Prerequisites

- [NodeJS](https://nodejs.org/en) version 18.16.0 or later
- [Visual Studio Code](https://code.visualstudio.com/) (optional)

## Getting started

1. Clone this repository: `git clone https://github.com/pedroalejandropt/api-university.git`
2. Open the folder project `api-university`
3. Run the project `npm run server`
4. The API will be available at `http://localhost:5000/api`

## Usage

The API provides endpoints for managing universities, faculties, and courses. All requests require a JSON payload in the request body and return a JSON response.

### Endpoints

- `GET /api/universities`: Retrieves a list of all universities
- `GET /api/universities/{id}`: Retrieves a single university by ID
- `POST /api/universities`: Creates a new university
- `PUT /api/universities/{id}`: Updates an existing university
- `DELETE /api/universities/{id}`: Deletes a university by ID
- `GET /api/universities/{id}/faculties`: Retrieves a list of all faculties for a university
- `GET /api/faculties/{id}`: Retrieves a single faculty by ID
- `POST /api/faculties`: Creates a new faculty
- `PUT /api/faculties/{id}`: Updates an existing faculty
- `DELETE /api/faculties/{id}`: Deletes a faculty by ID
- `GET /api/faculties/{id}/courses`: Retrieves a list of all courses for a faculty
- `GET /api/courses/{id}`: Retrieves a single course by ID
- `POST /api/courses`: Creates a new course
- `PUT /api/courses/{id}`: Updates an existing course
- `DELETE /api/courses/{id}`: Deletes a course by ID

### Examples

#### Create a university

```
POST /api/universities
{
    "name": "University of Example",
    "address": "123 Main St",
    "city": "Exampleville",
    "state": "EX",
    "zip": "12345"
}
```

Response:

```
{
    "id": 1,
    "name": "University of Example",
    "address": "123 Main St",
    "city": "Exampleville",
    "state": "EX",
    "zip": "12345"
}
```

#### Update a faculty

```
PUT /api/faculties/1
{
    "name": "New Faculty Name"
}
```

Response:

```
{
    "id": 1,
    "name": "New Faculty Name",
    "universityId": 1
}
```
