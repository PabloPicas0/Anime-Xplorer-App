const mongoose = require("mongoose");

const months = {};

for (let i = 1; i <= 12; i++) {
  months[
    new Date(`1995-${i < 10 ? "0" + i : i}-17T00:00:00`).toLocaleDateString("en-GB", { month: "short" })
  ] = 0;
}

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
        font: "Inter",
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
  metadata: {
    type: {
      monthWatchedEpisodes: { type: Object },
      monthCompletedEpisodes: {type: Object}
    },
    default: {
      monthWatchedEpisodes: {
        [new Date().toLocaleDateString("en-GB", { year: "numeric" })]: { ...months },
      },
      monthCompletedEpisodes: {
        [new Date().toLocaleDateString("en-GB", { year: "numeric" })]: { ...months },
      },
    },
  },
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
