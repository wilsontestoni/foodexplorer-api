const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const verifyAutentication = require("../middlewares/verifyAutentication")
const verifyAutorization = require("../middlewares/verifyAutorization")

const favoritesController = new FavoritesController();
const favoritesRoutes = Router();

favoritesRoutes.use(verifyAutentication)

favoritesRoutes.get("/", verifyAutorization(["admin", "customer"]), favoritesController.index);
// favoritesRoutes.get("/:id", verifyAutorization(["admin", "customer"]), favoritesController.show);
favoritesRoutes.post("/", verifyAutorization(["admin", "customer"]), favoritesController.create);
favoritesRoutes.delete("/:id", verifyAutorization(["admin", "customer"]), favoritesController.delete);

module.exports = favoritesRoutes;
