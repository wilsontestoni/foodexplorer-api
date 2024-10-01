const UsersRepository = require("../repositories/UsersRepository");
const UsersServices = require("../services/UsersServices");

const usersRepository = new UsersRepository();
const usersServices = new UsersServices(usersRepository);

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    await usersServices.create({ name, email, password });

    res.status(201).json();
  }
}

module.exports = UsersController;
