# GoodFind-BE

BE for GoodFind

## Setup Development Environment

- create .env file
- make sure you have docker, docker-compose, nodejs, yarn
- postgreSQL runs inside docker container so no need to install it on local just, run `docker compose up` to install PostgreSQL and run docker container.
- run 'yarn run db:push' used to run the migration code, this will create the tables in PostgreSQL, docker data persist even after closing the container so run this command only once while setting development environment or when the database schema is changed.
- We use yarn, install node modules using `yarn install` and run `yarn run start` to run server.
- We use husky, prettier to auto format before committing, but still to check whether your current code follows specified formatting, run `yarn run pcheck`, and to fix this formatting run `yarn run pfix`.

## Migration Flow

- run 'yarn run migrate' When ever you create new table/entity or change the database schema, to update the migration code using migrate script.
- 'yarn run db:push' to run the migration code.

## Visualize Database using Terminal

- get PostgreSQL container id using `docker ps`
- `docker exec -it <containerId> /bin/sh` to get inside the container
- `psql -U <user> <databaseName>` make sure to use same user and database name as defined in .env
- now you can run any sql query like `SELECT * FROM users;`

## APIs
