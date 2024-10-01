const FavoritesServices = require("../services/FavoritesServices");
const FavoritesRepository = require("../repositories/FavoritesRepository");

const favoritesRepository = new FavoritesRepository();

const favoritesServices = new FavoritesServices(favoritesRepository);

class FavoritesController {
  async create(req, res) {
    const user_id = req.user.id;
    const { plate_id } = req.body;

    await favoritesServices.create(user_id, plate_id);

    res.status(201).json();
  }

  async delete(req, res) {
    const { id: plate_id } = req.params;
    const user_id = req.user.id;

    await favoritesServices.delete(user_id, plate_id);

    res.status(204).json();
  }

  async index(req, res) {
    const user_id = req.user.id;

    const favorites = await favoritesServices.index(user_id);

    res.status(200).json(favorites);
  }
}

module.exports = FavoritesController;
