// ./models/index.js 文件
const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// 建立 Sequelize 實例
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
  },
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("資料庫成功連接...");
  })
  .catch((err) => {
    console.log("連接資料庫失敗..." + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 導入模型
db.members = require("./memberModel.js")(sequelize, DataTypes);
db.products = require("./productModel.js")(sequelize, DataTypes);
db.comments = require("./commentModel.js")(sequelize, DataTypes);
db.students = require("./studentModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);
db.posts = require("./postModel.js")(sequelize, DataTypes);
db.reservations = require("./reservationModel.js")(sequelize, DataTypes);

// 模型關聯
db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);
// 用戶與預約之間的關聯
db.users.hasMany(db.reservations, { foreignKey: "userId", as: "reservations" });
db.reservations.belongsTo(db.users, { as: "user" });

// re-sync 數據庫
db.sequelize.sync({ alter: true }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;
