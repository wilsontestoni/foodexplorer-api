const { Router } = require("express");
const PlatesController = require("../controllers/PlatesController");
const multer = require("multer");
const { MULTER_CONFIG } = require("../configs/uploadConfig")

const verifyAutentication = require("../middlewares/verifyAutentication")
const verifyAutorization = require("../middlewares/verifyAutorization")

const upload = multer(MULTER_CONFIG)

const platesController = new PlatesController();
const platesRoutes = Router();

platesRoutes.use(verifyAutentication)

platesRoutes.get("/", verifyAutorization(["admin", "customer"]), platesController.index);
platesRoutes.get("/:id", verifyAutorization(["admin", "customer"]), platesController.show);
platesRoutes.post("/", verifyAutorization(["admin"]), upload.single("img"), platesController.create);
platesRoutes.put("/:id", verifyAutorization(["admin"]), upload.single("img"), platesController.update);
platesRoutes.delete("/:id", verifyAutorization(["admin"]), platesController.delete);

module.exports = platesRoutes;
