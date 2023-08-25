import { combineReducers } from 'redux';

import WeatherReducer from './weather';

const reducers = {
  weather: WeatherReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

export type IReducerName = keyof typeof reducers;

export default combinedReducer;
