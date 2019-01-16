
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', tbl => {
        tbl.increments();
  
        tbl.text('name', 128).notNullable();
        
        tbl.integer('cohort_id').unsigned().references('id').inTable('cohorts');

        tbl.timestamps(true,true);
  
        tbl.unique('name', 'uq_students_name');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
