const OrdersRepository = require("../repositories/OrdersRepository");
const OrderServices = require("../services/OrdersServices");

const ordersRepository = new OrdersRepository();
const ordersServices = new OrderServices(ordersRepository);

class OrdersController {

  async show(req, res) {
    const { id: order_id } = req.params;

    const order = await ordersServices.show(order_id);

    return res.status(200).json(order);
  }

  async index(req, res) {
    const user_id = req.user.id;
    const user_role = req.user.role;

    const orders = await ordersServices.index(user_id, user_role);

    return res.status(201).json(orders);
  }

  async create(req, res) {
    const user_id = req.user.id;
    const { order } = req.body;

    const order_id = await ordersServices.create(user_id, order);

    return res.status(201).json({ order_id });
  }

  async update(req, res) {
    const { status } = req.body;
    const { id: order_id } = req.params;

    await ordersServices.update(order_id, status);

    return res.status(204).json();
  }
}

module.exports = OrdersController;
