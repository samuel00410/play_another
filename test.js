const Logger = require("./logger");
const logger = new Logger();

// 註冊事件監聽器
logger.on("messageLogged", (arg) => {
  console.log("Listener called", arg);
});

logger.log("message");
