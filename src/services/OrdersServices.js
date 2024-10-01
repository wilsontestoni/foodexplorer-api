
const AppError = require("../utils/AppError");
const moment = require("moment");

class OrdersServices {
  constructor(ordersRepository) {
    this.ordersRepository = ordersRepository;
  }

  async show(order_id) {
    const order = await this.ordersRepository.getOrderByOrderId(order_id);

    return order[0];
  }

  async index(user_id, user_role) {
    let orders;

    if (user_role === "customer") {
      orders = await this.ordersRepository.getOrdersById(user_id);
      const recentOrdersFirst = orders.reverse();
      return recentOrdersFirst;
    }

    orders = await this.ordersRepository.getAllOrders();
    const recentOrdersFirst = orders.reverse();
    
    return recentOrdersFirst;
  }

  async create(user_id, order) {
    if(order.length < 1) {
      throw new AppError('É preciso ter pelo menos um item para fazer um pedido', 400);
    }

    const initialValue = "";
    const details = order.reduce((acc, currentValue) => {
      acc += `${currentValue.quantityPurchased}x ${currentValue.plate.name}, `;
      return acc;
    }, initialValue);

    const formattedDetails = details.slice(0, -2);

    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = {
      user_id,
      details: formattedDetails,
      created_at,
    };

    const order_id = await this.ordersRepository.createOrder("orders", data);

    return order_id
  }

  async update(order_id, status) {
    await this.ordersRepository.updateStatus(order_id, status)
  }


}

module.exports = OrdersServices;
