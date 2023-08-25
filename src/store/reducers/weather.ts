import { Reducer } from 'redux';

import { defaultObj } from '../constants';
import { handleData } from '../middlewares/handleData';
import Types from '../types/weather';

const initialState = {
  weather: {
    ...defaultObj,
  },
  searchHistory: [],
};

const WeatherReducer: Reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case Types.GET_WEATHER:
      return handleData(state, action, {
        request: (prevState) => ({
          ...prevState,
          weather: {
            ...prevState.weather,
            loading: true,
          },
        }),
        success: (prevState) => ({
          ...prevState,
          weather: {
            loading: false,
            data: payload,
            error: '',
          },
        }),
        failure: (prevState) => ({
          ...prevState,
          weather: {
            loading: false,
            data: {},
            error: payload,
          },
        }),
      });
    case Types.SYNC_UPDATE_SEARCH_HISTORY: {
      return {
        ...state,
        searchHistory: payload,
      };
    }
    default:
      return state;
  }
};

export default WeatherReducer;
