import makeStore from './makeStore';

const SETTING_ACTIONS = {
  UPDATE_THEME: 'update-theme',
};

function reducer(state, action) {
  switch (action.type) {
    case SETTING_ACTIONS.UPDATE_THEME:
      return { ...state, isDarkMode: action.payload.isDarkMode };
    default:
      return state;
  }
}

const [SettingProvider, useSetting, useSettingDispatch] = makeStore(reducer, {
  isDarkMode: true,
});

export { SETTING_ACTIONS, SettingProvider, useSetting, useSettingDispatch };
