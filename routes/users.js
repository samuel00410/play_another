var express = require("express");
var router = express.Router();
const db = require("../models");
const Member = db.members;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 抓出所有會員
router.get("/members", async (req, res) => {
  let allMembers = await Member.findAll();
  return res.send({ description: "所有會員資料:", data: allMembers });
});

module.exports = router;
