const express = require("express");
const router = express.Router();
const db = require("../models");
const User = db.users;
const Reservation = db.reservations;

router.use((req, res, next) => {
  console.log("正在經過預約的中介層...");
  next();
});

// 預設的預約時間
const DEFAULT_RESERVE_TIMES = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
];

// 返回一些假定的預約時間
router.get("/time", (req, res) => {
  return res.send({ availableTime: DEFAULT_RESERVE_TIMES });
});

// 讓用戶能夠預約一個密室逃脫的時間
router.post("/book", async (req, res) => {
  // 取得用戶選擇的時間
  const { userId, reserveTime } = req.body;

  // 如果用戶選擇的時間不在預設的預約時間中(驗證時間是否有效)
  if (!DEFAULT_RESERVE_TIMES.includes(reserveTime)) {
    return res.status(400).send({ message: "無效的預約時間" });
  }
  try {
    // 檢查該用戶是否存在
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send({ message: "用戶不存在" });
    }

    // 如果時間有效，創建新的預約紀錄
    const newReservation = await Reservation.create({
      userId,
      reserveTime,
    });
    return res.send({ message: "預約成功", reservation: newReservation });
  } catch (e) {
    console.error("預約失敗", e);
    res.status(500).send({ error: "服務器錯誤，無法創建預約" });
  }
});

// 顯示該用戶的所有預約
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const results = await User.findOne({
    userId,
    include: {
      model: Reservation,
      as: "reservations",
    },
  });
  res.send({ msg: "顯示該用戶的所有預約", data: results.reservations });
});

module.exports = router;
