const knex = require("../database/knex");

class PlatesRespository {
  async createPlate(table, data) {
    const [id] = await knex(table).insert(data);
    return id;
  }

  async deletePlate(id) {
    await knex("plates").where({ id }).delete();
    return;
  }

  async getPlateById(id) {
    const plate = await knex("plates").where({ id }).first();
    return plate;
  }

  async getPlateIngredientsById(id) {
    const ingredients = await knex("ingredients")
      .where({ plate_id: id })
      .orderBy("name");
    return ingredients;
  }

  async getPlatesBySearchQuery(queryData) {
    const plates = await knex("plates")
      .join("ingredients", "plates.id", "ingredients.plate_id")
      .leftJoin("favorites", "plates.id", "favorites.plate_id")
      .select("plates.*", "favorites.id as favorite_id")
      .where("plates.name", "like", `%${queryData}%`)
      .orWhere("ingredients.name", "like", `%${queryData}%`)
      .groupBy("plates.id");
    return plates;
  }

  async updatePlate(id, plate) {
    await knex("plates").update(plate).where({ id });
  }
}

module.exports = PlatesRespository;
