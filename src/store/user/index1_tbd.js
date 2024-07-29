import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// ** Fetch Users
export const fetchData = createAsyncThunk(
  'appUsers/fetchData',
  async (params) => {
    const response = await fetch('/apps/users/list', {
      params,
    });

    return response.data;
  }
);

// ** Add User
export const addUser = createAsyncThunk(
  'appUsers/addUser',
  async (data, { getState, dispatch }) => {
    const response = await fetch('/apps/users/add-user', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    dispatch(fetchData(getState().user.params));

    return response.data;
  }
);

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.users;
      state.total = action.payload.total;
      state.params = action.payload.params;
      state.allData = action.payload.allData;
    });
  },
});
