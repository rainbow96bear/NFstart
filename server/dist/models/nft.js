"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// module.exports = 에서 export default 로 바꿈
module.exports = (sequelize, DataTypes) => {
    class NFT extends sequelize_1.Model {
        static associate(models) {
            // 관계 대상 정하기
            NFT.belongsTo(models.User, {
                foreignKey: "userAccount",
                targetKey: "account",
            });
        }
    }
    NFT.init({
        // 테이블 설정
        hash: {
            type: DataTypes.TEXT,
            allowNull: false,
            // unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publisher: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        IpfsHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        JsonIpfsHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        fees: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        volume: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
        },
    }, {
        sequelize,
        modelName: "NFT",
        collate: "utf8_general_ci",
    });
    return NFT;
};
