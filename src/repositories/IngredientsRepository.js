const knex = require("../database/knex");

class IngredientsRepository {
  async insertIngredients(table, data) {
    const [id] = await knex(table).insert(data);
    return id;
  }

  async deleteAllIngredientsById(plate_id) {
    await knex("ingredients").where({ plate_id }).delete();
  }
}

module.exports = IngredientsRepository;

