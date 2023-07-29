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
      animeType: {
        type: String,
      },
      animeName: {
        type: String,
      },
      animeStatus: {
        type: String,
      },
      currentEpisode: {
        type: Number,
      },
      allEpisodes: {
        type: Number,
      },
      score: {
        type: Number,
      },
    },
  ],
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
