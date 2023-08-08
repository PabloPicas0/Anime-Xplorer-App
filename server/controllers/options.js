const userModel = require("../models/User");

const options = async (req, res) => {
  const { username, keepLogined, darkMode, color, font, defaultListFilter } = req.body;

  try {
    const user = await userModel.findOne({ username: username });

    const userOptions = {
      keepLogined,
      darkMode,
      color,
      font,
      defaultListFilter,
    };

    user.accountSettings[0] = userOptions;

    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = options;
