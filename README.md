# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

Users (/user route)
GET /user:

Retrieve all users.
Response: Status code 200 and all user records.
GET /user/:id:

Retrieve a single user by ID.
Parameters:
id: User ID.
Response:
Status code 200 and the record with matching id if it exists.
Status code 400 and corresponding message if id is invalid.
Status code 404 and corresponding message if record with id doesn't exist.
POST /user:

Create a new user.
Request Body (CreateUserDto):
json
Copy code
{
  "login": "string",
  "password": "string"
}
Response:
Status code 201 and newly created record if request is valid.
Status code 400 and corresponding message if request body does not contain required fields.
PUT /user/:id:

Update a user's password.
Parameters:
id: User ID.
Request Body (UpdatePasswordDto):
json
Copy code
{
  "oldPassword": "string",
  "newPassword": "string"
}
Response:
Status code 200 and updated record if request is valid.
Status code 400 and corresponding message if id is invalid.
Status code 404 and corresponding message if record with id doesn't exist.
Status code 403 and corresponding message if oldPassword is wrong.
DELETE /user/:id:

Delete a user.
Parameters:
id: User ID.
Response:
Status code 204 if the record is found and deleted.
Status code 400 and corresponding message if id is invalid.
Status code 404 and corresponding message if record with id doesn't exist.
Tracks (/track route)
GET /track:

Retrieve all tracks.
Response: Status code 200 and all track records.
GET /track/:id:

Retrieve a single track by ID.
Parameters:
id: Track ID.
Response:
Status code 200 and the record with matching id if it exists.
Status code 400 and corresponding message if id is invalid.
Status code 404 and corresponding message if record with id doesn't exist.
POST /track:

Create a new track.
Request Body: (details not provided)
Response:
Status code 201 and newly created record if request is valid.
Status code 400 and corresponding message if request body does not contain required fields.
PUT /track/:id:

Update track info.
Parameters:
id: Track ID.
Request Body: (details not provided)
Response: (details not provided)
DELETE /track/:id:

Delete a track.
Parameters:
id: Track ID.
Response: (details not provided)
Artists (/artist route)
(Instructions for Artist routes continue in the same pattern as Users and Tracks)

Albums (/album route)
(Instructions for Album routes continue in the same pattern as Users, Tracks, and Artists)

Favorites
(Instructions for Favorites routes continue in the same pattern as Users, Tracks, Artists, and Albums)

Please refer to the provided documentation for detailed information on each endpoint, including request bodies and responses.
