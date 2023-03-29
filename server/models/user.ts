"use strict";

import { Model } from "sequelize";

interface UserAttributes {
  account: string;
  nickName: string;
  chainId: string;
  balance: number;
  profile: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    account!: string;
    nickName!: string;
    chainId!: string;
    balance!: number;
    profile!: string;
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
      profile: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
      collate: "utf8_general_ci",
    }
  );
  return User;
};
