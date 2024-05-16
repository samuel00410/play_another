// ./models/reservationModel.js 文件
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  // ES6 的 Class 的語法
  class Reservation extends Model {}

  Reservation.init(
    {
      reserveTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Reservation",
      tableName: "reservations",
    }
  );

  return Reservation;
};
