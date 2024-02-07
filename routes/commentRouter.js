const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("正在經過評論的中介層...");
  next();
});

router.get("/", (req, res) => {
  return res.send("這是comment頁面");
});

module.exports = router;
