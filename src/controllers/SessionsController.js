const UsersRepository = require("../repositories/UsersRepository");
const SessionsServices = require("../services/SessionsServices");

const usersRepository = new UsersRepository();
const sessionsServices = new SessionsServices(usersRepository);

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    const { user, token } = await sessionsServices.create({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true, // depois colocar true
      maxAge: 6 * 60 * 60 * 1000, // 6h,
    });

    res.status(200).json({ user });
  }
}

module.exports = SessionsController
