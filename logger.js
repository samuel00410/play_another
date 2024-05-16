const EventEmitter = require("events");

let url = "http://mylogger.io/log";

// 創建一個共用的日誌類別並引入事件發射器
class Logger extends EventEmitter {
  log(message) {
    // 發送 HTTP 請求
    console.log(message);

    // 發送事件
    this.emit("messageLogged", { id: 1, url: "http://..." }); // this指的是Logger的實例
  }
}

module.exports = Logger; // 將Logger類別導出
