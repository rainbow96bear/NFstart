const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        account: {
          type: Sequelize.STRING(255),
        },
        chainId: {
          type: Sequelize.STRING(100),
        },
        balance: {
          type: Sequelize.INTEGER.UNSIGNED,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "user",
        paranoid: true,
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(db) {}
};
