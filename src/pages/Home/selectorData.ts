import * as weatherActions from 'src/store/actions/weather';
import { useReducerData, useStoreActions } from 'src/store/hooks';

export const useIndexData = () => {
  const weather = useReducerData('weather', 'weather.data', {});
  const weatherLoading = useReducerData('weather', 'weather.loading', false);
  const searchHistory = useReducerData('weather', 'searchHistory', []);
  return {
    weather,
    weatherLoading,
    searchHistory,
  };
};

export const useActions = () => {
  return useStoreActions({
    ...weatherActions,
  });
};
