const { replaceCommaWithPeriod } = require("../utils/format");

const UploadProvider = require("../providers/UploadProvider");

class PlatesServices {
  constructor(platesRepository, ingredientsRepository) {
    this.platesRepository = platesRepository;
    this.uploadProvider = new UploadProvider();
    this.ingredientsRepository = ingredientsRepository;
  }

  async create(plateWithoutImg, user_id, imgFileName) {
    const { category, name, ingredients, price, description } = plateWithoutImg;

    const formatedPrice = Number(replaceCommaWithPeriod(price))

    const plate = {
      user_id,
      img: imgFileName,
      category,
      name,
      price: formatedPrice,
      description,
    };

    const plate_id = await this.platesRepository.createPlate("plates", plate);

    await this.uploadProvider.createFile(imgFileName);

    const ingredientsParsed = JSON.parse(ingredients);

    const ingredientsInsert = ingredientsParsed.map((ingredient) => {
      return {
        name: ingredient,
        user_id,
        plate_id,
      };
    });

    await this.ingredientsRepository.insertIngredients(
      "ingredients",
      ingredientsInsert
    );
  }

  async delete(id) {
    const plate = await this.platesRepository.getPlateById(id);

    await this.platesRepository.deletePlate(id);

    await this.uploadProvider.deleteFile(plate.img);
  }

  async show(id) {
    const plate = await this.platesRepository.getPlateById(id);
    const ingredients = await this.platesRepository.getPlateIngredientsById(id);

    const plateWithIngredients = {
      ...plate,
      ingredients,
    };

    return plateWithIngredients;
  }

  async index(queryData, user_id) {
    const plates = await this.platesRepository.getPlatesBySearchQuery(
      queryData,
      user_id
    );

    return plates;
  }

  async update(plateWithoutImg, user_id, imgFileName, plate_id) {
    const { category, name, ingredients, price, description } = plateWithoutImg;

    const plate = await this.platesRepository.getPlateById(plate_id);

    plate.name = name ?? plate.name;
    plate.category = category ?? plate.category;
    plate.price = price ?? plate.price;
    plate.description = description ?? plate.description;

    await this.ingredientsRepository.deleteAllIngredientsById(plate_id);

    if (!imgFileName) {
      const ingredientsInsert = ingredients.map((ingredient) => {
        return {
          name: ingredient,
          user_id,
          plate_id,
        };
      });

      await this.ingredientsRepository.insertIngredients(
        "ingredients",
        ingredientsInsert
      );

      await this.platesRepository.updatePlate(plate_id, plate);

      return;
    }

    await this.uploadProvider.deleteFile(plate.img);

    const newImgName = await this.uploadProvider.createFile(imgFileName);

    plate.img = newImgName;

    const ingredientsParsed = JSON.parse(ingredients);

    const ingredientsInsert = ingredientsParsed.map((ingredient) => {
      return {
        name: ingredient,
        user_id,
        plate_id,
      };
    });

    await this.ingredientsRepository.insertIngredients(
      "ingredients",
      ingredientsInsert
    );

    await this.platesRepository.updatePlate(plate_id, plate);
  }
}

module.exports = PlatesServices;
