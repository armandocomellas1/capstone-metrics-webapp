/**
 * @jest-environment jsdom
 */
import axios from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import MainStatTest from '../../components/MainforTest';
import { updateRegion } from '../global/globalReduce';

const mockStore = configureStore([]);

describe('My Connected React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });

    store.dispatch = jest.fn();

    component = renderer.create(
      <Provider store={store}>
        <MainStatTest />
      </Provider>,
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});

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
];

const fetchGlobalData = (async () => {
  const lats = ctryArray[0].AR.lat;
  const lons = ctryArray[0].AR.lon;

  const urlPolltionData = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lats}&lon=${lons}&appid=${apiKey}`;
  const response = await axios.get(urlPolltionData);
  const result = response.data;
  return result;
});

jest.mock('axios');

describe('Object stats check test and Details check test', () => {
  it('returns the title of the first album', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          coord:
          [
            50,
            50,
          ],
          list:
          [
            {
              dt: 1605182400,
              main: {
                aqi: 1,
              },
              components: {
                co: 201.94053649902344,
                no: 0.01877197064459324,
                no2: 0.7711350917816162,
                o3: 68.66455078125,
                so2: 0.6407499313354492,
                pm2_5: 0.5,
                pm10: 0.540438711643219,
                nh3: 0.12369127571582794,
              },
            },
          ],
        },
      ],
    });

    const title = await fetchGlobalData();
    const checkComponents = title[0].list[0].components;
    const components = {
      co: 201.94053649902344,
      no: 0.01877197064459324,
      no2: 0.7711350917816162,
      o3: 68.66455078125,
      so2: 0.6407499313354492,
      pm2_5: 0.5,
      pm10: 0.540438711643219,
      nh3: 0.12369127571582794,
    };
    expect(checkComponents).toEqual(components);
  });
});
