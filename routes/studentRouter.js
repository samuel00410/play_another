const express = require("express");
const router = express.Router();
const { Op, fn, col, Sequelize, QueryTypes } = require("sequelize");
const db = require("../models");
const dbConfig = require("../config/dbConfig");
const Student = db.students;

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

router.use((req, res, next) => {
  console.log("正經過學生middleware...");
  next();
});

// 新增多筆學生
router.post("/addNew", async (req, res) => {
  try {
    const students = await Student.bulkCreate(
      [
        { name: "josn", school_year: 11, favorite_class: "數學課" },
        {
          name: "eson",
          school_year: 10,
          favorite_class: "歷史課",
          subscribed_to_wittcode: false,
        },
      ],
      { validate: true }
    );

    console.log(
      students.map((student) => {
        return student.toJSON();
      })
    );

    return res.send({ msg: "新增多筆學生成功", data: students });
  } catch (e) {
    console.log(e);
  }
});

// 新增一筆學生
router.post("/addNewOne", async (req, res) => {
  const { name, age, school_year, favorite_class } = req.body;
  console.log(name, age, school_year, favorite_class);

  try {
    const newStudent = await Student.create({
      name,
      age,
      school_year,
      favorite_class,
    });

    return res.send({ msg: "新增單筆學生成功", data: newStudent });
  } catch (e) {
    // 檢查錯誤類型

    // 如果是驗證錯誤(資料輸入不符合規範)
    if (e.name === "SequelizeValidationError") {
      console.log(e.errors);
      // 提取所有驗證錯誤的訊息
      const errorMessages = e.errors.map((error) => {
        return error.message;
      });

      return res
        .status(400)
        .send({ msg: "資料驗證失敗!", data: errorMessages });
    }
  }
});

// 檢索所有喜歡的課程為 數學課 或沒訂閱了 WittCode 的學生名字
router.get("/find", async (req, res) => {
  const findStudents = await Student.findAll({
    attributes: ["name"],
    where: {
      [Op.or]: [
        { favorite_class: "數學課" },
        { subscribed_to_wittcode: false },
      ],
    },
  });

  findStudents.map((student) => {
    console.log(student.toJSON());
  });
});

// 統計每個學年的學生總數，並將返回的列別名為 num_students。
router.get("/num_students", async (req, res) => {
  const result = await Student.findAll({
    attributes: [
      "school_year",
      [fn("COUNT", col("student_id")), "num_students"],
    ],
    group: "school_year",
  });

  result.forEach((data) => {
    console.log(data.toJSON());
  });
  return res.send(result);
});

// 測試
router.post("/justest", async (req, res) => {
  const result = await Student.findAll({ paranoid: false });

  const r = result.map((data) => {
    return data.toJSON();
  });

  console.log(r);
});

module.exports = router;
