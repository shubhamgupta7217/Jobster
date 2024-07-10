import customFetch from "../../utils/axios";
import authHeader from "../../utils/userAuthHeader";

export const getAllJobsThunk = async (_, thunkAPI) => {
  const {
    page, search, searchStatus, searchType, sort,
  } = thunkAPI.getState().allJobs;

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
  if (search) url += `&search=${search}`;

  try {
    const resp = await customFetch.get(url, authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/jobs/stats", authHeader(thunkAPI));
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
