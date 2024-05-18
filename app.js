var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const todoRouter = require("./routes/todoRouter");
const productsRouter = require("./routes/productRouter");
const commentsRouter = require("./routes/commentRouter");
const studentsRouter = require("./routes/studentRouter");
const userRouter = require("./routes/userRouter");
const reserveRouter = require("./routes/reserveRouter");
const OpenAiRouter = require("./routes/OpenAiRouter"); // OpenAi的API路徑導向

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 路由導向
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/todos", todoRouter);
app.use("/products", productsRouter);
app.use("/comments", commentsRouter);
app.use("/students", studentsRouter);
app.use("/api/users", userRouter);
app.use("/api/reserves", reserveRouter);
app.use("/api/openai", OpenAiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
