const db = require("../models");
const Member = db.members;

addNewMember = async (req, res) => {
  const newMember = await Member.create({
    phoneNumber: "040457827",
    userName: "maxbb",
    email: "mahuyu13@gmail.com",
    password: "12345333",
  });

  console.log(newMember.toJSON());
};

findAllMembers = async (req, res) => {
  const findMember = await Member.findAll({
    attributes: { exclude: ["phoneNumber"] },
  });

  const memberJSON = findMember.map((member) => member.toJSON()); // 將搜尋到的結果把陣列的每個值(用戶資料)都變成 JSON 形式
  console.log(memberJSON);
  return res.send({ msg: "找到的用戶:", data: findMember });
};

module.exports = {
  findAllMembers,
  addNewMember,
};
