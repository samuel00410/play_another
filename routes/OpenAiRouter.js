const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// 透過 API 密鑰建立 OpenAI 的 客戶端
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // 創建OpenAI的API實例

router.use((req, res, next) => {
  console.log("正在經過OpenAiRouter...");
  next();
});

async function createThread() {
  console.log("創建新的一個線程...");
  const thread = await openai.beta.threads.create();

  return thread;
}

// --- 處理OpenAI的API請求 ---

// 創建線程
router.get("/thread", async (req, res) => {
  createThread().then((thread) => {
    return res.send({ threadId: thread.id });
  });
});

module.exports = router;
