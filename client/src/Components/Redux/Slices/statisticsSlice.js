import { createSlice } from "@reduxjs/toolkit";

export const statisticsSlice = createSlice({
  name: "statisticsSlice",
  initialState: {
    isStatisticsLoading: true,
    statistics: [],
  },
  reducers: {
    handleStatisticsLoading: (state, action) => {
      state.isStatisticsLoading = action.payload;
    },
    handleStatisticsData: (state, action) => {
      state.statistics = [...action.payload];
    },
  },
});

export const { handleStatisticsLoading, handleStatisticsData } = statisticsSlice.actions;
export default statisticsSlice.reducer;
