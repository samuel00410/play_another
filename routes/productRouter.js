const express = require("express");
const router = express.Router();
const db = require("../models");
const Product = db.products;

router.use((req, res, next) => {
  console.log("正在經過商品的中介層...");
  next();
});

router.get("/", (req, res) => {
  return res.send("這是product頁面");
});

// 創建一個商品
router.post("/createOne", async (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = await Product.create({ name, description, price });

  return res.send({ text: "以新增一個商品資訊:", data: newProduct });
});

// 獲取所有商品
router.get("/all", async (req, res) => {
  const foundProducts = await Product.findAll();

  return res.send({ text: "以下是所有商品", data: foundProducts });
});

// 抓取單件商品
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const productExist = await Product.findOne({ where: { id: id } });
  try {
    if (!productExist) {
      return res.status(400).send("找不到該商品...");
    }

    return res.send({ data: productExist });
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
