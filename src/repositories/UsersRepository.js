const knex = require("../database/knex");

class UsersRepository {
  async findUserByEmail(email) {
    const user = await knex("users").where({ email }).first();
    return user;
  }

  async createUser({ name, email, password }) { 
    const [ id ] = await knex("users").insert({ name, email, password })
    return id;
  } 

}

module.exports = UsersRepository;
