"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Chat extends sequelize_1.Model {
        static associate(model) { }
    }
    Chat.init({
        userId: { type: DataTypes.STRING, allowNull: false },
        partnerId: { type: DataTypes.STRING, allowNull: false },
        text: { type: DataTypes.TEXT, allowNull: false },
        time: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        paranoid: true,
        underscored: true,
        modelName: "Chat",
        collate: "utf8_general_ci",
    });
    return Chat;
};
