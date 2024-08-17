import { configureStore } from '@reduxjs/toolkit';
import podcastReducer from '../features/podcast/podcastSlice.jsx';

export const store = configureStore({
  reducer: {
    podcast: podcastReducer,
  },
});
