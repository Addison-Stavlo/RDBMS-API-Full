commands used to start project --

create package.json and install knex & sqlite3 dependencies using:
`npm init -y `
`yarn add knex sqlite3` 

run knex `knex init`

rename db file in knexfile to desired name
add `useNullAsDefault: true` to knex file - enables sqlite3

create migration `knex migrate:make cohorts`
edit this with knex commands from documentation
create migration `knex migrate:make students` similarly...

create DB by running `knex migrate:latest`
can use `knex migrate:rollback` to rollback last set of migrations

extra: make seeds `knex seed:make 001-name`
`knex seed:run`

