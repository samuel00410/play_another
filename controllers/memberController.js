const db = require("../models");
const Member = db.members;

findAllMembers = async (req, res) => {
  let allMembers = await Member.findAll();
  return res.send({ description: "所有會員資料:", data: allMembers });
};

module.exports = {
  findAllMembers,
};
