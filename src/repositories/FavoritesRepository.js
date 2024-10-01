const knex = require("../database/knex");

class FavoritesRespository {
  async createFavoritePlate(table, data) {
    const [id] = await knex(table).insert(data);
    return id;
  }

  async deleteFavoritePlate(user_id, plate_id) {
    await knex("favorites").where({ user_id, plate_id }).delete();
    return;
  }

  async getAllUserFavoritesPlates(user_id) {
    const favoritesPlates = await knex("favorites")
      .join("plates", "favorites.plate_id", "plates.id")
      .select("plate_id", "plates.name", "plates.img")
      .where("favorites.user_id", user_id);
    return favoritesPlates;
  }
}

module.exports = FavoritesRespository;
