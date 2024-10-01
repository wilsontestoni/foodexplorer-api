exports.up = (knex) =>
  knex.schema.createTable("orders", (table) => {
    table.increments("id");
    table.enum("status", ["Pendente", "Preparando", "Entregue" ], { useNative: true, enumName: "status" }).notNullable().default("Pendente")
    table.text("details").notNullable();
    table.timestamp("created_at").default(knex.fn.now());

    table.integer("user_id").references("id").inTable("users");
  });

exports.down = (knex) => knex.schema.dropTable("orders");