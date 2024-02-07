// ./models/commentModel.js
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      title: { type: DataTypes.STRING },
      content: { type: DataTypes.TEXT },
      rating: { type: DataTypes.INTEGER },
    },
    {
      tableName: "comments", // 告訴 Sequelize 表的名稱
    }
  );
  return Comment;
};
