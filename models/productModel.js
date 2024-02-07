// ./models/productModel.js
module.exports = (sequelize, DataTypes) => {
  // 定義模型 (是一個 class類別 )
  const Product = sequelize.define(
    "Product",
    {
      name: { type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      price: { type: DataTypes.DECIMAL(10, 2) },
      isPublished: { type: DataTypes.BOOLEAN },
    },
    {
      tableName: "products", // 告訴 Sequelize 表的名稱
    }
  );

  return Product;
};
