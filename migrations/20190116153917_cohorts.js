
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
      tbl.increments();

      tbl.text('name', 128).notNullable();

      tbl.timestamps(true,true);

      tbl.unique('name', 'uq_cohorts_name');
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
};
