import { configureStore } from '@reduxjs/toolkit';
import globalSlice from './global/globalReduce';

const reducer = {
  globaStats: globalSlice,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
