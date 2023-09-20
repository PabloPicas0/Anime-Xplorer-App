const userModel = require("../models/User");

const filterUserList = async (req, res) => {
  try {
    const { type, search, min, max, fromDate, toDate } = req.body;
    console.table({ type, search, min, max, fromDate, toDate });
  } catch (error) {
    console.log(error);
  }
};

module.exports = filterUserList;
