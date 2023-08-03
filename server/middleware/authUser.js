const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: true,
      status: [{ msg: "You don't have profile token. Please login or sign up." }],
      profile: {
        username: "",
        date: 0,
        options: [],
        list: [],
      },
      isAuthenticated: false,
    });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.KEY);

    req.user = decodedUser;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      error: true,
      status: [{ msg: "Your profile token has expired. Please login." }],
      isAuthenticated: false,
      profile: {
        username: "",
        date: 0,
        options: [],
        list: [],
      },
    });
  }
};

module.exports = middleware;
