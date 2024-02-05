const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const todos = [
  {
    title: "這是預設資料",
    id: uuidv4(),
  },
];

router.get("/", (req, res) => {
  res.send({ status: "success", todos: todos });
});

router.post("/", (req, res) => {
  // 取得用戶輸入的資料
  const { title } = req.body;

  const newTodo = [
    {
      title,
      id: uuidv4(),
    },
  ];

  todos.push(newTodo);

  res.send({ status: "success", todo: newTodo });
});

module.exports = router;
