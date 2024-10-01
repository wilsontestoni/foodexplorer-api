const knex = require("../database/knex");

class OrdersRespository {
  async createOrder(table, data) {
    const [id] = await knex(table).insert(data);
    return id;
  }

  async getOrdersById(user_id) {
    const orders = await knex("orders").where({ user_id });
    return orders;
  }

  async getOrderByOrderId(order_id) {
    const order = await knex("orders").where({ id: order_id });
    return order;
  }

  async getAllOrders() {
    const orders = await knex("orders");
    return orders;
  }

  async updateStatus(order_id, status) {
    await knex("orders").update({ status }).where({ id: order_id });
  }
}

module.exports = OrdersRespository;
