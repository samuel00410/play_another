const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.users;
const Post = db.posts;

// 新增多筆使用者資料
router.post("/addNewUsers", async (req, res) => {
  const addUser = await User.bulkCreate([
    { username: "user01", password: "user01111" },
    { username: "user02", password: "user022222" },
    { username: "user03", password: "user03333" },
    { username: "user04", password: "user04444" },
  ]);

  return res.send({ msg: "新增用戶成功", data: addUser });
});

// 修改特定使用者資訊
router.patch("/edit/:userId", async (req, res) => {
  const { userId } = req.params;
  const { username, password } = req.body;
  console.log(userId);
  console.log(username, password);
  try {
    const userExist = await User.findOne({ where: { id: userId } });
    // 確定有沒有這個id的使用者
    if (!userExist) return res.status(400).send("找不到使用者...");

    // 準備要更新的資料
    const updatedData = {};
    if (username) updatedData.username = username;
    if (password) updatedData.password = password;

    // 更新使用者資訊
    await userExist.update(updatedData);
    return res.send({ msg: "使用者資訊更新成功", user: userExist });
  } catch (e) {
    console.log(e);
  }
});

// 新增多筆訊息資料
router.post("/addNewPosts", async (req, res) => {
  const addPost = await Post.bulkCreate([
    { message: "哈哈是我啦" },
    { message: "測試看看" },
    { message: "玩玩看" },
    { message: "RRRRRRRRRR" },
  ]);

  return res.send({ msg: "新增訊息成功", data: addPost });
});

// 為特定使用者新增帖子
router.post("/:userId/addPost", async (req, res) => {
  const { userId } = req.params;
  const { message } = req.body; // 收到從前端發出的請求
  try {
    const userExist = await User.findOne({ where: { id: userId } });
    if (!userExist) {
      return res.status(400).send("找不到使用者...");
    }

    // 使用特殊方法`createPost`為該使用者新增帖子
    const newPost = await userExist.createPost({
      message,
    });

    return res.send({ msg: "新增帖子成功", post: newPost });
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "新增帖子時發生錯誤", error: error.message });
  }
});

module.exports = router;
