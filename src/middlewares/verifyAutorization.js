const AppError = require("../utils/AppError");

function verifyAutorization(roles) {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (roles.includes(userRole)) {
      return next();
    }

    throw new AppError("Você não tem autorização para fazer essa ação", 401);
  };
}

module.exports = verifyAutorization;
