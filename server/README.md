# GoodFind-BE

BE for GoodFind

## Setup Development Environment

- create .env file
- make sure you have docker, docker-compose, nodejs, npm
- postgreSQL runs inside docker container so no need to install it on local just, run `docker compose up` to install PostgreSQL and run docker container.
- run 'npm run db:push' used to run the migration code, this will create the tables in PostgreSQL, docker data persist even after closing the container so run this command only once while setting development environment or when the database schema is changed.
- We use npm, install node modules using `npm i` and run `npm run start` to run server.
- We use husky, prettier to auto format before committing, but still to check whether your current code follows specified formatting, run `npm run pcheck`, and to fix this formatting run `npm run pfix`.

## Migration Flow

- run `npm run migrate` When ever you create new table/entity or change the database schema, to update the migration code using migrate script.
- 'npm run db:push' to run the migration code.

## Visualize Database using Terminal

- get PostgreSQL container id using `docker ps`
- `docker exec -it <containerId> /bin/bash` to get inside the container
- `psql -U admin goodfind_db` make sure to use same user and database name as defined in .env
- now you can run any sql query like `SELECT * FROM users;`

## APIs

### AUTH

```js
GET /api/auth/register

Responses : application/json
Example Value :
Successful Operation

{
    "status": "success",
    "data": null,
    "message": "Page loaded successfully"
}

```

```js
POST /api/auth/register

- 1.
Request body : application/json
Example Value :

{
    "name":"Ketan",
    "email":"19ucc020@lnmiit.ac.in",
    "contact_number": 9461721651,
    "password": "Ketan1234",
    "password_confirm": "Ketan1234"
}

Responses : application/json
Example Value :
Successful Operation

{
    "status": "success",
    "data": {
        "user": {
            "name": "Ketan",
            "email": "19ucc020@lnmiit.ac.in",
            "contact_number": 9461721651,
            "password": "$2a$10$pThDkBTlUlX/Q.D4qYjsFuh.2DEOxv7gtW8TTBFN7ZJvzqZ.2TTU2",
            "change_password_token": null,
            "last_login_at": null,
            "created_at": "2022-12-10T08:08:07.411Z",
            "updated_at": "2022-12-10T08:08:07.411Z",
            "id": "12cde753-e7be-4142-9a5e-7a3d885ac53b",
            "role": "user"
        }
    }
}


Error -

Responses : application/json
Example Value :
Successful Operation

1.
{
    "status": "fail",
    "message": "User with that email already exist"
}

2.
{
    "status": "fail",
    "message": "User with that contact number already exist"
}

3.
{
    "status": "error",
    "error_name": "ZodError",
    "message": "Please confirm your password",
    "error_code": "invalid_type"
}

```

```js
GET /api/auth/login

Responses : application/json
Example Value :
Successful Operation

{
    "status": "success",
    "data": null,
    "message": "Page loaded successfully"
}

```

```js
POST /api/auth/login

- 1.
Request body : application/json
Example Value :

{
    "password": "Ketan1234",
    "email":"19ucc020@lnmiit.ac.in"
}

Responses : application/json
Example Value :
Successful Operation

{
    "status": "success",
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkYmMyMjgxLTc4YmEtNGY1NC1iYWFhLTMzYWQ0MmY3MjEwZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjcwNjc5NjI5LCJleHAiOjE2NzA2ODMyMjl9.ZMOSfV2XJ2ZAfZ5_wJ8w_d6WBrgcYDNwYKfhy3kzz2_c6b5521QCm5yNnTS76Ipvj1xdOapQgTC1eRMu-axjCg",
    "last_login_at": "2022-12-10T13:40:29.633Z"
}


Error -

Responses : application/json
Example Value :
Successful Operation

1.
{
    "status": "error",
    "error_name": "ZodError",
    "message": "Email address is required",
    "error_code": "invalid_type"
}

2.
{
    "status": "fail",
    "message": "Invalid email or password"
}

```

```js
GET /api/auth/logout

Responses : application/json
Example Value :
Successful Operation

{
    "status": "success",
    "data": null,
    "message": "Page loaded successfully"
}
```

### USERS

-> "sortFilter": "asc"
-> "sortFilter": "desc"
-> By default is ascending if not used

```js


GET /api/users/all


- 1.
Request body : application/json
Example Value :
{
    "params":{}
}

Responses : application/json
Example Value :
Successful Operation
{
    "status": "success",
    "data": {
        "users": [
            {
                "created_at": "2022-12-10T08:08:07.411Z",
                "updated_at": "2022-12-10T08:08:07.411Z",
                "id": "12cde753-e7be-4142-9a5e-7a3d885ac53b",
                "name": "Raja1",
                "email": "19ucc0191@lnmiit.ac.in",
                "contact_number": "9461721653",
                "role": "user",
                "password": "$2a$10$pThDkBTlUlX/Q.D4qYjsFuh.2DEOxv7gtW8TTBFN7ZJvzqZ.2TTU2",
                "change_password_token": null,
                "last_login_at": null
            },
            {
                "created_at": "2022-12-10T07:17:45.972Z",
                "updated_at": "2022-12-10T08:10:14.895Z",
                "id": "e223571a-676c-45d7-9de8-8accfc491933",
                "name": "Raja Kumar Singh",
                "email": "19ucc019@lnmiit.ac.in",
                "contact_number": "9461721655",
                "role": "user",
                "password": "$2a$10$C6HTeaeHfd/Tp1YYwYuo9OfZmdI0iVoK52fa84FrbCOyVuciBFRCe",
                "change_password_token": null,
                "last_login_at": "2022-12-10T13:40:14.887Z"
            },
            {
                "created_at": "2022-12-10T06:06:34.144Z",
                "updated_at": "2022-12-10T08:10:29.640Z",
                "id": "adbc2281-78ba-4f54-baaa-33ad42f7210e",
                "name": "Kittu",
                "email": "19ucc020@lnmiit.ac.in",
                "contact_number": "9461721651",
                "role": "user",
                "password": "$2a$10$/RwwfWPJLUz3DByUEj7cSux3DVdL14jGRbUntL4rYRek59V4h4bwS",
                "change_password_token": null,
                "last_login_at": "2022-12-10T13:40:29.633Z"
            }
        ]
    },
    "message": "All Users data retrieved successfully"
}

- 2.
Request:
{
    "params": {
        "searchType": "LIST",
        "selected": [
            {
                "field": "name"
            }
        ]
    }
}

Response:
{
    "status": "success",
    "data": {
        "users": [
            {
                "name": "Gaurav"
            },
            {
                "name": "Raja Kumar Singh"
            },
            {
                "name": "Ketan"
            }
        ]
    },
    "message": "All Users data retrieved successfully"
}

- 3.
Request:
{
    "params": {
        "searchType": "COUNT",
        "selected": [
            {
                "field": "name"
            }

        ]
    }
}

Response:
{
    "status": "success",
    "data": {
        "users": 3
    },
    "message": "All Users data retrieved successfully"
}
```
