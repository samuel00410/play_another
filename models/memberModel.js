// ./models/memberModel.js 文件

module.exports = (sequelize, DataTypes) => {
  // 定義模型
  const Member = sequelize.define("member", {
    // 在這裡定義模型屬性
    googleID: {
      type: DataTypes.STRING,
      unique: true,
    },
    facebookID: {
      type: DataTypes.STRING,
      unique: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    thumbnail: {
      type: DataTypes.TEXT,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
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
