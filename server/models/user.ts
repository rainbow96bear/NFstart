"use strict";

import { Model } from "sequelize";

interface UserAttributes {
  account: string;
  nickName: string;
  chainId: string;
  balance: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    account!: string;
    nickName!: string;
    chainId!: string;
    balance!: number;
    static associate(models: any) {
      // 관계 대상 정하기
      User.hasMany(models.NFT, {
        as: "UserNFTs",
        foreignKey: "userAccount",
        sourceKey: "account",
      });
    }
  }
  User.init(
    {
      account: { type: DataTypes.STRING, allowNull: false, unique: true },
      nickName: { type: DataTypes.STRING, allowNull: false },
      chainId: { type: DataTypes.STRING, allowNull: false },
      balance: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
