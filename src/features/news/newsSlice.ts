import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchNewsFromApi } from "../../api/newsApi";

interface NewsState {
  articles: any[];
  loading: boolean;
  error: string | null;
  category: string;
  page: number;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  category: "",
  page: 1,
};

// Asynchronous thunk action to fetch news
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async ({ category, page }: { category: string; page: number }) => {
    const response = await fetchNewsFromApi(category, page);
    return response.data.articles;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  // Here actions which mutate the state
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  // Handle state of async thunk action - pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export const { setCategory, setPage } = newsSlice.actions;

// Helps in extracting the news state from the redux =store
export const selectNews = (state: RootState) => state.news;

export default newsSlice.reducer;
