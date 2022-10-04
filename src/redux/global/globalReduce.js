import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { keys } from 'lodash';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import loadingStatus from '../loadStats';

const apiKey = '3abef7d08df814b60b6cf49bc1cac539';

const ctryArray = [
  {
    AR: {
      lat: -35,
      lon: -65,
    },
  },
  {
    BR: {
      lat: -10,
      lon: -53,
    },
  },
  {
    CL: {
      lat: -32,
      lon: -71,
    },
  },
  {
    FR: {
      lat: 46,
      lon: 2,
    },
  },
  {
    CO: {
      lat: -35,
      lon: -65,
    },
  },
  {
    DE: {
      lat: 51,
      lon: 10,
    },
  },
  {
    CA: {
      lat: 61,
      lon: -108,
    },
  },
  {
    IN: {
      lat: 22,
      lon: 79,
    },
  },
  {
    IL: {
      lat: 31,
      lon: 35,
    },
  },
  {
    JP: {
      lat: 37,
      lon: 139,
    },
  },
  {
    NL: {
      lat: 52,
      lon: 6,
    },
  },
  {
    PH: {
      lat: 13,
      lon: 123,
    },
  },
  {
    TH: {
      lat: 15,
      lon: 101,
    },
  },
  {
    TR: {
      lat: 39,
      lon: 35,
    },
  },
  {
    GB: {
      lat: 55,
      lon: -3,
    },
  },
  {
    US: {
      lat: 40,
      lon: -100,
    },
  },
  {
    RU: {
      lat: 65,
      lon: 98,
    },
  },
  {
    SP: {
      lat: 40,
      lon: -4,
    },
  },
  {
    UA: {
      lat: 50,
      lon: 31,
    },
  },
  {
    QA: {
      lat: 25,
      lon: 55,
    },
  },
  {
    SG: {
      lat: 1,
      lon: 104,
    },
  },
  {
    ID: {
      lat: -5,
      lon: 115,
    },
  },
  {
    IQ: {
      lat: 33,
      lon: 44,
    },
  },
  {
    AU: {
      lat: -25,
      lon: 135,
    },
  },
  {
    MA: {
      lat: 31,
      lon: -7,
    },
  },
  {
    ZA: {
      lat: -29,
      lon: -25,
    },
  },
  {
    EG: {
      lat: 26,
      lon: 29,
    },
  },
];

const ACTION_PREPEND = 'POLLUTION/GLOBAL';

export const fetchGlobalData = createAsyncThunk(ACTION_PREPEND, async () => {
  const arrayGlobal = [];
  const passArray = [];
  ctryArray.forEach((data) => {
    const ctryName = [`${Object.keys(data)}`][0];
    const getLat = data[`${Object.keys(data)[0]}`].lat;
    const getLon = data[`${Object.keys(data)[0]}`].lon;
    const urlPolltionData = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${getLat}&lon=${getLon}&appid=${apiKey}`;
    const response = axios.get(urlPolltionData);
    const result = response.data;
    const objCtry = {};
    objCtry[ctryName] = response;
    // console.log('objCtry', objCtry);
    // return arrayGlobal.concat([10]);
    arrayGlobal.push(objCtry);
  });
    const results = await Promise.all(arrayGlobal);
    results.forEach((data) => {
      const ctryName = [`${Object.keys(data)}`][0];
      data[ctryName].then((res) => {
        passArray.push(res.data);
      });
    });
    // console.log('results', results);
    // const actualDatas = results.map((result) => {
    //   const getKey = [`${Object.keys(result)}`][0];
    //   const getResult = result[getKey];
    //   console.log('getResult', getResult);
    //   return getResult;
    // });
    // console.log('actualDatas', actualDatas);
    return passArray;
});

const createBook = (data) => ({
  item_id: uuidv4(),
  ...data,
});

const initialState = {
  stateArr: [],
  status: 'IDLE',
};

const globalSlice = createSlice({
  name: ACTION_PREPEND,
  initialState,
  reducers: {
    updateRocket: (state, action) => {
      // const getState = current(state).rockets;
      // for (let i = 0; i < getState.length; i += 1) {
      //   if (getState[i].id === Number(action.payload)) {
      //     // state.rockets.rocket = true;
      //     state.rockets[i].reserve = true;
      //   }
      // }
    },
    cancelRocket: (state, action) => {
      //   const getState = current(state).rockets;
      //   for (let i = 0; i < getState.length; i += 1) {
      //     if (getState[i].id === Number(action.payload)) {
      //       // state.rockets.rocket = true;
      //       state.rockets[i].reserve = false;
      //     }
      //   }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchGlobalData.fulfilled, (state = initialState, action) => {
        state.status = loadingStatus.succeeded;
        const getAction = action.payload;
        // state.stateArr = [...getAction];
        // state.stateArr = { ...action.payload, stateArr: getAction };
        // console.log('fetchGlobalData action', action);
        // console.log('fetchGlobalData state', state);
        // state.stateArr = [getAction];
        // return [
        //   state.stateArr,
        //   action.payload,
        // ];
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateRocket, cancelRocket } = globalSlice.actions;

export default globalSlice.reducer;
