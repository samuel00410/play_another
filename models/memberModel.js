// ./models/memberModel.js 文件

module.exports = (sequelize, DataTypes) => {
  // 定義模型
  const Member = sequelize.define("member", {
    // 在這裡定義模型屬性

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // 設定 email 屬性為唯一值
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("player", "creator"),
      defaultValue: "player",
      allowNull: false,
    },
  });

  return Member;
};
