import makeStore from './makeStore';

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
      return { ...state, selectedDate: action.payload.selectedDate };
    default:
      return state;
  }
}

const [GlobalProvider, useGlobal, useGlobalDispatch] = makeStore(reducer, {
  section: 'airing',
  filter: '',
  selectedDate: 'All',
});

export { STORE_ACTIONS, GlobalProvider, useGlobal, useGlobalDispatch };
