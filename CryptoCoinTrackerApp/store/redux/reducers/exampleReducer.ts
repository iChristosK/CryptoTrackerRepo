import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Data {
  // Define the shape of your data
}

// Define an async thunk //INSIDE ACTION
export const fetchData = createAsyncThunk<Data>(
  "sliceName/fetchData",
  async () => {
    // Perform async operation here, e.g., fetch data from an API
    const response = await fetch("https://api.example.com/data");
    const data = await response.json();
    return data;
  },
);

// Define your slice
const sliceNameSlice = createSlice({
  name: "sliceName",
  initialState: {
    data: null,
    loading: false,
    error: null,
  } as {
    data: Data | null;
    loading: boolean;
    error: string | null;
  },
  reducers: {
    // Define other synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred.";
    });
  },
});

// Export actions and reducer
export const {
  /* Other synchronous action creators if needed */
} = sliceNameSlice.actions;
export default sliceNameSlice.reducer;
