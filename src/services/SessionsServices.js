const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/authConfig")

class SessionsServices {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async create({ email, password }) {

    if (!email) {
      throw new AppError("É preciso informar o email para logar na plataforma");
    }
    if (!password) {
      throw new AppError("É preciso informar a senha para logar na plataforma");
    }

    const user = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("O E-mail inserido não está cadastrado na plataforma", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched) {
      throw new AppError("A senha não confere", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    })
    
    delete user.email
    delete user.password

    return { user, token }

  }
}

module.exports = SessionsServices;
