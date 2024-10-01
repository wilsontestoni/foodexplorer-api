exports.up = (knex) =>
  knex.schema.createTable("plates", (table) => {
    table.increments("id");
    table.integer("user_id").references("id").inTable("users");

    table.text("img").notNullable();
    table.enum("category", ["Refeições", "Sobremesas", "Bebidas" ], { useNative: true, enumName: "categories" }).notNullable()
    table.text("name").notNullable();
    table.decimal('price', 8, 2);
    table.text("description").notNullable();

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("plates");
