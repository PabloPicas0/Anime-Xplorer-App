const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountCreated: {
    type: Number,
  },
  accountSettings: [
    {
      keepLogined: {
        type: Boolean,
      },
      color: {
        type: String,
      },
      font: {
        type: String,
      },
      defaultListFilter: {
        type: String,
      },
    },
  ],
  animeList: [
    {
      animeType: String,
      animeName: String,
      animeStatus: String,
      currentEpisode: Number,
      allEpisodes: Number,
      score: Number,
    },
  ],
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
