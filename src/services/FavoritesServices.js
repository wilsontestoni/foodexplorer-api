class FavoritesServices {
  constructor(favoritesRepository) {
    this.favoritesRepository = favoritesRepository;
  }

  async create(user_id, plate_id) {
    const data = {
      user_id,
      plate_id,
    };

    await this.favoritesRepository.createFavoritePlate("favorites", data);
  }

  async delete(user_id, plate_id) {
    await this.favoritesRepository.deleteFavoritePlate(user_id, plate_id);
  }

  async index(user_id) {
    const favorites = await this.favoritesRepository.getAllUserFavoritesPlates(
      user_id
    );

    return favorites;
  }
}

module.exports = FavoritesServices;
