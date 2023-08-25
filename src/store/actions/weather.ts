import { Dispatch } from 'redux';
import { apiGetWeather } from 'src/api';
import { ISearchHistory } from 'src/types';

import Types from '../types/weather';

export const getWeather =
  (search: string, cb?: any) => (dispatch: Dispatch) => {
    dispatch({
      isAsyncCall: true,
      payload: {},
      type: Types.GET_WEATHER,
      asyncCall: () => {
        return apiGetWeather(search);
      },
      onSuccess: (_dispatch: any, response: any) => {
        if (cb) cb(response);
      },
      onFailure: (_dispatch: any, error: any) => {
        if (cb) cb(false, error);
      },
    });
  };

export const syncUpdateSearchHistory =
  (result: ISearchHistory[]) => (dispatch: Dispatch) => {
    dispatch({
      type: Types.SYNC_UPDATE_SEARCH_HISTORY,
      payload: result,
    });
  };
