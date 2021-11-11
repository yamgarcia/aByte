exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("phone").notNullable();
    table.string("country").notNullable();
    table.string("state", 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
