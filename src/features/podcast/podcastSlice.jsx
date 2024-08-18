import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  shows: [],
  episodes: [],
  status: 'idle',
  error: null,
};

export const fetchShows = createAsyncThunk('podcast/fetchShows', async () => {
  try {
    const response = await axios.get('https://beta.sochcast.com/api/v1/listener/sochcast-originals');
    console.log("API Response Data podcastSLice Data:", response.data); // Log entire response
    return response.data.results;
  } catch (error) {
    console.error("Fetch Shows Error:", error);
    throw error;
  }
});

export const fetchEpisodes = createAsyncThunk('podcast/fetchEpisodes', async (slug) => {
  try {
    const response = await axios.get(`https://beta.sochcast.com/api/v1/listener/show/${slug}`);
    console.log("API Response Data podcastSLice Data:", response.data); // Log entire response
    return response.data.results;
  } catch (error) {
    console.error("Fetch Shows Error:", error);
    throw error;
  }
});

const podcastSlice = createSlice({
  name: 'podcast',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shows = action.payload; 
        console.log("Shows Data:", state.shows); 
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error("Fetch Shows Error:", action.error.message); 
      })
      .addCase(fetchEpisodes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.episodes = action.payload; 
        console.log("Episodes Data:", state.episodes);
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.error("Episodes Shows Error:", action.error.message); 
      });
  },
});

export default podcastSlice.reducer;
