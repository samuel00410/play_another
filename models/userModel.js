// ./models/userModel.js 文件
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // ES6 的 Class 的語法
  class User extends Model {
    // 這裡定義(使用者)模型的方法
    static findUser(username) {
      return this.findOne({ where: { username } });
    }

    getFullnameForCapital() {
      return this.username.toUpperCase();
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false, // 不能為空值值
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // 不能為空值值
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
