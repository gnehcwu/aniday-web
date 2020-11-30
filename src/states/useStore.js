import makeStore from './makeStore';
import { SETTING_ACTIONS } from './useSettings';

const STORE_ACTIONS = {
  UPDATE_FILTER: 'update-filter',
  UPDATE_SECTION: 'update-section',
  UPDATE_LOADING_STATUS: 'update-loading-status',
  UPDATE_LOADING_DATA: 'update-loading-data',
};

function reducer(state, action) {
  switch (action.type) {
    case STORE_ACTIONS.UPDATE_FILTER:
      return { ...state, filter: action.payload.filter };
    case STORE_ACTIONS.UPDATE_SECTION:
      return { ...state, section: action.payload.section };
    // case STORE_ACTIONS.UPDATE_LOADING_DATA:
    //   return { ...state, isLoading: action.payload.isLoading };
    case STORE_ACTIONS.UPDATE_LOADING_STATUS:
      return { ...state, isLoading: action.payload.isLoading };
    default:
      return state;
  }
}

const [GlobalProvider, useGlobal, useGlobalDispatch] = makeStore(reducer, {
  section: 'airing',
  filter: '',
  isLoading: false,
  animes: [],
  tbas: [],
});

export { STORE_ACTIONS, GlobalProvider, useGlobal, useGlobalDispatch };
