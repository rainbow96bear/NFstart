"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends sequelize_1.Model {
        static associate(models) {
            // 관계 대상 정하기
            User.hasMany(models.NFT, {
                as: "UserNFTs",
                foreignKey: "userAccount",
                sourceKey: "account",
            });
        }
    }
    User.init({
        account: { type: DataTypes.STRING, allowNull: false, unique: true },
        nickName: { type: DataTypes.STRING, allowNull: false },
        chainId: { type: DataTypes.STRING, allowNull: false },
        balance: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
        profile: { type: DataTypes.STRING, allowNull: false },
    }, {
        sequelize,
        modelName: "User",
        collate: "utf8_general_ci",
    });
    return User;
};
