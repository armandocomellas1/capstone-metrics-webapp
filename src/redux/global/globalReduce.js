import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { keys } from 'lodash';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { act } from 'react-dom/test-utils';
import loadingStatus from '../loadStats';

const apiKey = '3abef7d08df814b60b6cf49bc1cac539';

const ctryArray = [
  {
    AR: {
      name: 'Argentina',
      region: 'South America',
      lat: -35,
      lon: -65,
    },
  },
  {
    BR: {
      name: 'Brazil',
      region: 'South America',
      lat: -10,
      lon: -53,
    },
  },
  {
    CL: {
      name: 'Chile',
      region: 'South America',
      lat: -32,
      lon: -71,
    },
  },
  {
    FR: {
      name: 'France',
      region: 'Europe',
      lat: 46,
      lon: 2,
    },
  },
  {
    CO: {
      name: 'Colombia',
      region: 'South America',
      lat: -35,
      lon: -65,
    },
  },
  {
    DE: {
      name: 'Germany',
      region: 'Europe',
      lat: 51,
      lon: 10,
    },
  },
  {
    CA: {
      name: 'Canada',
      region: 'North America & Caribbean',
      lat: 61,
      lon: -108,
    },
  },
  {
    IN: {
      name: 'India',
      region: 'Asia',
      lat: 22,
      lon: 79,
    },
  },
  {
    IL: {
      name: 'Israel',
      region: 'Asia',
      lat: 31,
      lon: 35,
    },
  },
  {
    JP: {
      name: 'Japan',
      region: 'Asia',
      lat: 37,
      lon: 139,
    },
  },
  {
    NL: {
      name: 'Netherlands',
      region: 'Europe',
      lat: 52,
      lon: 6,
    },
  },
  {
    PH: {
      name: 'Philippines',
      region: 'Asia',
      lat: 13,
      lon: 123,
    },
  },
  {
    TH: {
      name: 'Thailand',
      region: 'Asia',
      lat: 15,
      lon: 101,
    },
  },
  {
    TR: {
      name: 'Türkiye',
      region: 'Asia',
      lat: 39,
      lon: 35,
    },
  },
  {
    GB: {
      name: 'Great Britain',
      region: 'Europe',
      lat: 55,
      lon: -3,
    },
  },
  {
    US: {
      name: 'United States of America',
      region: 'North America & Caribbean',
      lat: 40,
      lon: -100,
    },
  },
  {
    RU: {
      name: 'Russian Federation',
      region: 'Europe',
      lat: 65,
      lon: 98,
    },
  },
  {
    ES: {
      name: 'Spain',
      region: 'Europe',
      lat: 40,
      lon: -4,
    },
  },
  {
    UA: {
      name: 'Ukraine',
      region: 'Europe',
      lat: 50,
      lon: 31,
    },
  },
  {
    QA: {
      name: 'Qatar',
      region: 'Asia',
      lat: 25,
      lon: 55,
    },
  },
  {
    SG: {
      name: 'Singapore',
      region: 'Asia',
      lat: 1,
      lon: 104,
    },
  },
  {
    ID: {
      name: 'Indonesia',
      region: 'Asia',
      lat: -5,
      lon: 115,
    },
  },
  {
    IQ: {
      name: 'Iraq',
      region: 'Asia',
      lat: 33,
      lon: 44,
    },
  },
  {
    AU: {
      name: 'Australia',
      region: 'Oceania',
      lat: -25,
      lon: 135,
    },
  },
  {
    MA: {
      name: 'Morocco',
      region: 'Africa',
      lat: 31,
      lon: -7,
    },
  },
  {
    ZA: {
      name: 'South Africa',
      region: 'Africa',
      lat: -29,
      lon: -25,
    },
  },
  {
    EG: {
      name: 'Egypt',
      region: 'Africa',
      lat: 26,
      lon: 29,
    },
  },
  {
    MX: {
      name: 'Mexico',
      region: 'North America & Caribbean',
      lat: 23,
      lon: -100,
    },
  },
];

const ACTION_PREPEND = 'POLLUTION/GLOBAL';

export const fetchGlobalData = createAsyncThunk(ACTION_PREPEND, async () => {
  const arrayGlobal = [];
  const arrayPromises = [];
  ctryArray.forEach((data) => {
    const ctryName = [`${Object.keys(data)}`][0];
    const getLat = data[`${Object.keys(data)[0]}`].lat;
    const getLon = data[`${Object.keys(data)[0]}`].lon;
    const getName = data[`${Object.keys(data)[0]}`].name;
    const getRegion = data[`${Object.keys(data)[0]}`].region;
    const urlPolltionData = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${getLat}&lon=${getLon}&appid=${apiKey}`;
    const response = axios.get(urlPolltionData);
    const result = response.data;
    const objCtry = {};
    objCtry[ctryName] = response;
    objCtry.Name = getName;
    objCtry.Region = getRegion;
    arrayPromises.push(response);
    arrayGlobal.push(objCtry);
  });

  await Promise.all(arrayPromises);

  const results = arrayGlobal.map(async (contry) => {
    return ({
      contry: `${Object.keys(contry)[0]}`,
      Name: contry.Name,
      Region: contry.Region,
      list: (await contry[`${Object.keys(contry)[0]}`]).data.list,
    });
  });

  const passArray = await Promise.all(results);
  return passArray;
});

const createBook = (data) => ({
  item_id: uuidv4(),
  ...data,
});

const initialState = {
  stateArr: [],
  status: 'IDLE',
  region: '',
};

const globalSlice = createSlice({
  name: ACTION_PREPEND,
  initialState,
  reducers: {
    updateRegion: (state, action) => {
      // const getState = current(state).stateArr;
      // const updateArr = [];
      // getState.filter((cntry) => cntry.Region === action.payload).map((data) => {
      //   updateArr.push(data);
      //   return updateArr;
      // });
      // console.log('updateArr', updateArr);
      state.region = action.payload;
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
        state.status = loadingStatus.pending;
      })
      .addCase(fetchGlobalData.fulfilled, (state = initialState, action) => {
        state.status = loadingStatus.succeeded;
        state.region = 'Europe';
        state.stateArr = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { updateRegion, cancelRocket } = globalSlice.actions;

export default globalSlice.reducer;
