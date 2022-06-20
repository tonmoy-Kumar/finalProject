const Sequelize = require("sequelize");

//data base info from .env
const dataBase = "tonmoy";
const user = "root";
const pass = "";
const host = "localhost";
const dialect = "mysql";

const sequelize = new Sequelize(dataBase, user, pass, {
  dialect: dialect,
  host: host,
});
console.log(sequelize);
module.exports = sequelize;
