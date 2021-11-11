exports.up = function (knex) {
  return knex.schema.createTable("quotes", function (table) {
    table.increments();
    table.string("quote_author").notNullable();
    table.string("quote_text").notNullable();
    table.string("users_id").notNullable();

    table.foreign("users_id").references("id").inTable("users");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("quotes");
};
