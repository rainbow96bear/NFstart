"use strict";
import { Model } from "sequelize";

interface NftAttributes {
  // 테이블 type 작성할 것
  account: string;
  nickName: string;
  chainId: string;
  balance: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Nft extends Model<NftAttributes> {
    static associate(models: any) {
      // 관계 대상 정하기
      // Nft.belongsTo(models.User, {
      //   foreignKey: "account",
      //   targetKey: "account",
      // });
    }
  }
  Nft.init(
    {
      // 테이블
      account: { type: DataTypes.STRING, allowNull: false, unique: true },
      nickName: { type: DataTypes.STRING, allowNull: false },
      chainId: { type: DataTypes.STRING, allowNull: false },
      balance: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    },
    {
      sequelize,
      modelName: "Nft",
    }
  );
  return Nft;
};
