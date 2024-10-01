require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const AppError = require("./utils/AppError");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const { UPLOADS_FOLDER } = require("./configs/uploadConfig");
const moment = require("moment-timezone");

moment.tz.setDefault("America/Sao_Paulo");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);

app.use("/files", express.static(UPLOADS_FOLDER));
app.use(routes);

app.use((error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    status: "error",
    message: "Erro interno no servidor",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
