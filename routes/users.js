var express = require("express");
var router = express.Router();
const db = require("../models");
const Member = db.members;
// Controller
const memberController = require("../controllers/memberController");

router.use((req, res, next) => {
  console.log("正在經過使用者的middleware");
  next();
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 新增一筆會員資料
router.post("/addNew", memberController.addNewMember);

// 找出所有會員
router.get("/members", memberController.findAllMembers);

module.exports = router;
