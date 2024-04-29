/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('todolist', (table) => {
        table.increments('id').primary()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.integer('user_id')
        //table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE')
        table.timestamps(true, true)
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('todolist')
  
};