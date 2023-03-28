import { Model } from "sequelize";
interface ChatAttributes {
  userId: string;
  partnerId: string;
  text: Text;
  time: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Chat extends Model<ChatAttributes> implements ChatAttributes {
    userId!: string;
    partnerId!: string;
    text!: Text;
    time!: string;
    static associate(model: any) {}
  }
  Chat.init(
    {
      userId: { type: DataTypes.STRING, allowNull: false },
      partnerId: { type: DataTypes.STRING, allowNull: false },
      text: { type: DataTypes.TEXT, allowNull: false },
      time: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      paranoid: true,
      underscored: true,
      modelName: "Chat",
      collate: "utf8_general_ci",
    }
  );
  return Chat;
};
