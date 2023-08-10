const userModel = require("../models/User");

const options = async (req, res) => {
  const { username, keepLogined, darkMode, color, font, defaultListFilter } = req.body;

  try {
    const user = await userModel.findOne({ username: username });

    if (!user) {
      return res.status(404).json({
        error: true,
        status: [{ msg: "Something went wrong. Please refresh the page." }],
      });
    }

    const userOptions = {
      keepLogined,
      darkMode,
      color,
      font,
      defaultListFilter,
    };

    user.accountSettings[0] = userOptions;

    await user.save();

    return res.status(200).json({
      error: false,
      status: [{ msg: "Settings saved" }],
      settings: user.accountSettings,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: true,
      status: [{ msg: "Internal server error. Please try again later." }],
    });
  }
};

module.exports = options;
