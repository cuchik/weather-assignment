import get from 'lodash/get';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppDispatch, RootState } from '..';
import { IReducerName } from '../reducers/index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const useReducerData = (
  reducerName: IReducerName,
  attr: string,
  defaultValue: unknown
) => {
  return useSelector(
    (state: any) => get(state, `${reducerName}.${attr}`) || defaultValue
  );
};

const useStoreActions = <T>(actions: T) => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(actions || {}, dispatch) as T,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [actions]
  );
};

export { useStoreActions, useReducerData, useAppSelector, useAppDispatch };
