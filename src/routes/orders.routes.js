const { Router } = require("express");

const OrdersController = require("../controllers/OrdersController");
const verifyAutentication = require("../middlewares/verifyAutentication")
const verifyAutorization = require("../middlewares/verifyAutorization")

const ordersController = new OrdersController();
const ordersRoutes = Router();

ordersRoutes.use(verifyAutentication)

ordersRoutes.get("/:id", verifyAutorization(["customer"]), ordersController.show);
ordersRoutes.get("/", verifyAutorization(["admin", "customer"]), ordersController.index);
ordersRoutes.post("/", verifyAutorization(["admin", "customer"]), ordersController.create);
ordersRoutes.patch("/:id", verifyAutorization(["admin"]), ordersController.update);

module.exports = ordersRoutes;
