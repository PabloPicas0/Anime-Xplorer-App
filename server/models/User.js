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
  accountSettings: {
    type: [
      {
        keepLogined: {
          type: Boolean,
        },
        darkMode: {
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
    default: [
      {
        keepLogined: false,
        darkMode: false,
        color: "Blue",
        font: "Arial",
        defaultListFilter: "All anime",
      },
    ],
  },
  animeList: [
    {
      animeType: String,
      animeName: String,
      animeStatus: String,
      currentEpisode: Number,
      allEpisodes: Number,
      startWatching: Number,
      endWatching: Number,
      score: Number,
    },
  ],
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
