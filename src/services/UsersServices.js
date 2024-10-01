const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersServices {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create({ name, email, password }) {
    if (!name || !email || !password) {
      throw new AppError("É preciso preencher todos os campos para cadastro");
    }

    const userExists = await this.usersRepository.findUserByEmail(email);

    if (userExists) {
      throw new AppError("Já existe um usuário utilizando esse e-mail!");
    }

    const hashedPassword = await hash(password, 8);

    const newUser = await this.usersRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}

module.exports = UsersServices;
