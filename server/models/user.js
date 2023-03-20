const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      account: {
        type: Sequelize.STRING(255),
      },
    });
  }
};
