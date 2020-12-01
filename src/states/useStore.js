import makeStore from './makeStore';

const STORE_ACTIONS = {
  UPDATE_FILTER: 'update-filter',
  UPDATE_SECTION: 'update-section',
};

function reducer(state, action) {
  switch (action.type) {
    case STORE_ACTIONS.UPDATE_FILTER:
      return { ...state, filter: action.payload.filter };
    case STORE_ACTIONS.UPDATE_SECTION:
      const { section } = action.payload;
      console.log(444, section);
      return { ...state, section };
    default:
      return state;
  }
}

const [GlobalProvider, useGlobal, useGlobalDispatch] = makeStore(reducer, {
  section: 'airing',
  filter: '',
});

export { STORE_ACTIONS, GlobalProvider, useGlobal, useGlobalDispatch };
