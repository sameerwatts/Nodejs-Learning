const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Ut8%thag", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
