// ./models/studentModel.js 文件
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "student",
    {
      student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        validate: {
          len: {
            args: [4, 20], // 仅允许长度在4到20之间的值
            msg: "名字長度必須要在4到20之間!",
          },
        },
        allowNull: false,
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER,
        defaultValue: 20,
        allowNull: false,
        validate: {
          // 只允许数字
          isNumeric: {
            msg: "你只能輸入數字!",
          },
          // 自定義驗證器，這裡是判斷是否有超過18歲
          isOldEnough(value) {
            if (value < 18) {
              throw new Error("未達到合法年齡!");
            }
          },
        },
      },
      favorite_class: {
        type: DataTypes.STRING(25),
        defaultValue: "Computer Science",
      },
      school_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subscribed_to_wittcode: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      fullStudentData: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.name} ${this.favorite_class}`;
        },
        set(value) {
          throw new Error("不要尝试设置 `fullStudentData` 的值!");
        },
      },
    },
    { freezeTableName: true, timestamps: true, paranoid: true } // freezeTableName: true => 強制讓資料表名稱等於模型名稱 指"student"，timestamps: false => 不要加上时间戳(預設是會加)
  );

  return Student;
};
