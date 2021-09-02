import makeStore from './makeStore';
import { getUnixTime, startOfDay, endOfDay } from 'date-fns';

const STORE_ACTIONS = {
  UPDATE_FILTER: 'update-filter',
  UPDATE_SECTION: 'update-section',
  UPDATE_SELECT_DATE: 'update-select-date',
};

function reducer(state, action) {
  switch (action.type) {
    case STORE_ACTIONS.UPDATE_FILTER:
      return { ...state, filter: action.payload.filter };
    case STORE_ACTIONS.UPDATE_SECTION:
      const { section } = action.payload;
      return { ...state, section };
    case STORE_ACTIONS.UPDATE_SELECT_DATE:
      const [startTimestamp, endTimestamp] = action.payload;
      return { ...state,  startTimestamp, endTimestamp};
    default:
      return state;
  }
}

const [StoreProvider, useStore, useStoreDispatch] = makeStore(reducer, {
  section: 'airing',
  filter: '',
  startTimestamp: getUnixTime(startOfDay(new Date())),
  endTimestamp: getUnixTime(endOfDay(new Date())),
  animeList: [],
  tba: [],
  today: new Date()
});

export { STORE_ACTIONS, StoreProvider, useStore, useStoreDispatch };
