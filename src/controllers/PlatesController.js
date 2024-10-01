const PlatesServices = require("../services/PlatesServices");
const PlatesRepository = require("../repositories/PlatesRespository");
const IngredientsRepository = require("../repositories/IngredientsRepository");

const platesRepository = new PlatesRepository();
const ingredientsRepository = new IngredientsRepository();

const platesServices = new PlatesServices(
  platesRepository,
  ingredientsRepository
);

class PlatesController {
  async create(req, res) {
    const plateWithoutImg = req.body;
    const user_id = req.user.id;
    const imgFileName = req.file.filename;

    await platesServices.create(plateWithoutImg, user_id, imgFileName);

    res.status(201).json();
  }

  async delete(req, res) {
    const { id } = req.params;

    await platesServices.delete(id);

    res.status(204).json();
  }

  async show(req, res) {
    const { id } = req.params;

    const plate = await platesServices.show(id);

    res.status(200).json(plate);
  }

  async index(req, res) {
    const { queryData } = req.query;

    const plates = await platesServices.index(queryData);

    res.status(200).json(plates);
  }

  async update(req, res) {
    const plateWithoutImg = req.body;
    const user_id = req.user.id;
    const { id } = req.params;
    const plate_id = id;

    const imgFileName = req.file ? req.file.filename : null;

    await platesServices.update(plateWithoutImg, user_id, imgFileName, plate_id);

    res.status(204).json();
  }
}

module.exports = PlatesController;
