import makeStore from './makeStore';
import { getUnixTime, startOfDay, endOfDay } from 'date-fns';

const STORE_ACTIONS = {
  UPDATE_FILTER: 'update-filter',
  UPDATE_SECTION: 'update-section',
  UPDATE_SELECT_DATE: 'update-select-date',
  UPDATE_AIRING: 'update-airing',
  UPDATE_TBA: 'update-tba',
  UPDATE_LOADING: 'update-loading',
};

function reducer(state, action) {
  switch (action.type) {
    case STORE_ACTIONS.UPDATE_FILTER:
      return { ...state, filter: action.payload };
    case STORE_ACTIONS.UPDATE_SECTION:
      const section  = action.payload;
      return { ...state, section };
    case STORE_ACTIONS.UPDATE_SELECT_DATE:
      const [startTimestamp, endTimestamp] = action.payload;
      return { ...state, startTimestamp, endTimestamp };
    case STORE_ACTIONS.UPDATE_AIRING:
      const [stamp, data] = action.payload;
      state.animeList.set(stamp, data);
      return { ...state, isLoading: false };
    case STORE_ACTIONS.UPDATE_TBA:
      return { ...state, tbaList: action.payload, isLoading: false };
    case STORE_ACTIONS.UPDATE_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

const [StoreProvider, useStore, useStoreDispatch] = makeStore(reducer, {
  section: 'airing',
  filter: '',
  startTimestamp: getUnixTime(startOfDay(new Date())),
  endTimestamp: getUnixTime(endOfDay(new Date())),
  animeList: new Map(),
  tbaList: [],
  today: new Date(),
  isLoading: false
});

export { STORE_ACTIONS, StoreProvider, useStore, useStoreDispatch };
